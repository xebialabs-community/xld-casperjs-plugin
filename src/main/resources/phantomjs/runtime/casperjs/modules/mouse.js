/*
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
 * FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.
 */
/*global CasperError, exports, patchRequire, require:true*/

var require = patchRequire(require);
var utils = require('utils');

exports.create = function create(casper) {
    "use strict";
    return new Mouse(casper);
};

var Mouse = function Mouse(casper) {
    "use strict";
    if (!utils.isCasperObject(casper)) {
        throw new CasperError('Mouse() needs a Casper instance');
    }

    var slice = Array.prototype.slice,
        nativeEvents = ['mouseup', 'mousedown', 'click', 'mousemove'];
    if (utils.gteVersion(phantom.version, '1.8.0')) {
        nativeEvents.push('doubleclick');
    }
    var emulatedEvents = ['mouseover', 'mouseout'],
        supportedEvents = nativeEvents.concat(emulatedEvents);

    function computeCenter(selector) {
        var bounds = casper.getElementBounds(selector);
        if (utils.isClipRect(bounds)) {
            var x = Math.round(bounds.left + bounds.width / 2);
            var y = Math.round(bounds.top  + bounds.height / 2);
            return [x, y];
        }
    }

    function processEvent(type, args) {
        if (!utils.isString(type) || supportedEvents.indexOf(type) === -1) {
            throw new CasperError('Mouse.processEvent(): Unsupported mouse event type: ' + type);
        }
        if (emulatedEvents.indexOf(type) > -1) {
            casper.log("Mouse.processEvent(): no native fallback for type " + type, "warning");
        }
        args = slice.call(args); // cast Arguments -> Array
        casper.emit('mouse.' + type.replace('mouse', ''), args);
        switch (args.length) {
            case 0:
                throw new CasperError('Mouse.processEvent(): Too few arguments');
            case 1:
                // selector
                casper.page.sendEvent.apply(casper.page, [type].concat(computeCenter(args[0])));
                break;
            case 2:
                // coordinates
                if (!utils.isNumber(args[0]) || !utils.isNumber(args[1])) {
                    throw new CasperError('Mouse.processEvent(): No valid coordinates passed: ' + args);
                }
                casper.page.sendEvent(type, args[0], args[1]);
                break;
            default:
                throw new CasperError('Mouse.processEvent(): Too many arguments');
        }
    }

    this.processEvent = function() {
        processEvent(arguments[0], slice.call(arguments, 1));
    };

    this.click = function click() {
        processEvent('click', arguments);
    };

    this.doubleclick = function doubleclick() {
        processEvent('doubleclick', arguments);
    };

    this.down = function down() {
        processEvent('mousedown', arguments);
    };

    this.move = function move() {
        processEvent('mousemove', arguments);
    };

    this.up = function up() {
        processEvent('mouseup', arguments);
    };
};
exports.Mouse = Mouse;
