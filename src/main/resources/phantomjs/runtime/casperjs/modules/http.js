/*
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
 * FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.
 */
/*global patchRequire, require:true*/

var require = patchRequire(require);
var utils = require('utils');

/*
 * Building an Array subclass
 */
function responseHeaders(){}
responseHeaders.prototype = [];

/**
 * Retrieves a given header based on its name
 *
 * @param   String  name    A case-insensitive response header name
 * @return  mixed   A header string or `null` if not found
 */
responseHeaders.prototype.get = function get(name){
    "use strict";
    var headerValue = null;
    name = name.toLowerCase();
    this.some(function(header){
        if (header.name.toLowerCase() === name){
            headerValue = header.value;
            return true;
        }
    });
    return headerValue;
};

/**
 * Augments the response with proper prototypes.
 *
 * @param  Mixed  response  Phantom response or undefined (generally with local files)
 * @return Object           Augmented response
 */
exports.augmentResponse = function(response) {
    "use strict";
    /*jshint proto:true*/
    if (!utils.isHTTPResource(response)) {
        return;
    }
    response.headers.__proto__ = responseHeaders.prototype;
    return response;
};
