/*
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
 * FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.
 */
/*global CasperError, console, exports, phantom, patchRequire, require:true*/

var require = patchRequire(require);
var utils = require('utils');
var f = utils.format;

function create() {
    "use strict";
    return new Stack();
}
exports.create = create;

/**
 * Popups container. Implements Array prototype.
 *
 */
var Stack = function Stack(){};
exports.Stack = Stack;

Stack.prototype = [];

/**
 * Cleans the stack from closed popup.
 *
 * @param  WebPage  closed  Closed popup page instance
 * @return Number           New stack length
 */
Stack.prototype.clean = function clean(closed) {
    "use strict";
    var closedIndex = -1;
    this.forEach(function(popup, index) {
        if (closed === popup) {
            closedIndex = index;
        }
    });
    if (closedIndex > -1) {
        this.splice(closedIndex, 1);
    }
    return this.length;
};

/**
 * Finds a popup matching the provided information. Information can be:
 *
 * - RegExp: matching page url
 * - String: strict page url value
 * - WebPage: a direct WebPage instance
 *
 * @param  Mixed  popupInfo
 * @return WebPage
 */
Stack.prototype.find = function find(popupInfo) {
    "use strict";
    var popup, type = utils.betterTypeOf(popupInfo);
    switch (type) {
        case "regexp":
            popup = this.findByRegExp(popupInfo);
            break;
        case "string":
            popup = this.findByURL(popupInfo);
            break;
        case "qtruntimeobject": // WebPage
            popup = popupInfo;
            if (!utils.isWebPage(popup) || !this.some(function(popupPage) {
                if (popupInfo.id && popupPage.id) {
                    return popupPage.id === popup.id;
                }
                return popupPage.url === popup.url;
            })) {
                throw new CasperError("Invalid or missing popup.");
            }
            break;
        default:
            throw new CasperError(f("Invalid popupInfo type: %s.", type));
    }
    return popup;
};

/**
 * Finds the first popup which url matches a given RegExp.
 *
 * @param  RegExp  regexp
 * @return WebPage
 */
Stack.prototype.findByRegExp = function findByRegExp(regexp) {
    "use strict";
    var popup = this.filter(function(popupPage) {
        return regexp.test(popupPage.url);
    })[0];
    if (!popup) {
        throw new CasperError(f("Couldn't find popup with url matching pattern %s", regexp));
    }
    return popup;
};

/**
 * Finds the first popup matching a given url.
 *
 * @param  String  url  The child WebPage url
 * @return WebPage
 */
Stack.prototype.findByURL = function findByURL(string) {
    "use strict";
    var popup = this.filter(function(popupPage) {
        return popupPage.url.indexOf(string) !== -1;
    })[0];
    if (!popup) {
        throw new CasperError(f("Couldn't find popup with url containing '%s'", string));
    }
    return popup;
};

/**
 * Returns a human readable list of current active popup urls.
 *
 * @return Array  Mapped stack.
 */
Stack.prototype.list = function list() {
    "use strict";
    return this.map(function(popup) {
        try {
            return popup.url;
        } catch (e) {
            return '<deleted>';
        }
    });
};

/**
 * String representation of current instance.
 *
 * @return String
 */
Stack.prototype.toString = function toString() {
    "use strict";
    return f("[Object Stack], having %d popup(s)" % this.length);
};
