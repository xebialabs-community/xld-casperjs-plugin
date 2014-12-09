/*
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
 * FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.
 */
/*global CasperError, console, exports, phantom, patchRequire, require:true*/

var require = patchRequire(require);
var utils = require('utils');
var system = require('system');

/**
 * Extracts, normalize ad organize PhantomJS CLI arguments in a dedicated
 * Object.
 *
 * @param  array  phantomArgs  system.args value
 * @return Object
 */
exports.parse = function parse(phantomArgs) {
    "use strict";
    var extract = {
        args: [],
        options: {},
        raw: {
            args: [],
            options: {}
        },
        drop: function drop(what) {
            if (utils.isNumber(what)) {
                // deleting an arg by its position
                this.args = this.args.filter(function _filter(arg, index) {
                    return index !== what;
                });
                // raw
                if ('raw' in this) {
                    this.raw.args = this.raw.args.filter(function _filter(arg, index) {
                        return index !== what;
                    });
                }
            } else if (utils.isString(what)) {
                // deleting an arg by its value
                this.args = this.args.filter(function _filter(arg) {
                    return arg !== what;
                });
                // deleting an option by its name (key)
                delete this.options[what];
                // raw
                if ('raw' in this) {
                    this.raw.args = this.raw.args.filter(function _filter(arg) {
                        return arg !== what;
                    });
                    delete this.raw.options[what];
                }
            } else {
                throw new CasperError("Cannot drop argument of type " + typeof what);
            }
        },
        has: function has(what) {
            if (utils.isNumber(what)) {
                return what in this.args;
            }
            if (utils.isString(what)) {
                return what in this.options;
            }
            throw new CasperError("Unsupported cli arg tester " + typeof what);
        },
        get: function get(what, def) {
            if (utils.isNumber(what)) {
                return what in this.args ? this.args[what] : def;
            }
            if (utils.isString(what)) {
                return what in this.options ? this.options[what] : def;
            }
            throw new CasperError("Unsupported cli arg getter " + typeof what);
        }
    };
	phantomArgs.forEach(function _forEach(arg) {
        if (arg.indexOf('--') === 0) {
            // named option
            var optionMatch = arg.match(/^--(.*?)=(.*)/i);
            if (optionMatch) {
                extract.options[optionMatch[1]] = castArgument(optionMatch[2]);
                extract.raw.options[optionMatch[1]] = optionMatch[2];
            } else {
                // flag
                var flagMatch = arg.match(/^--(.*)/);
                if (flagMatch) {
                    extract.options[flagMatch[1]] = extract.raw.options[flagMatch[1]] = true;
                }
            }
        } else {
            // positional arg
            extract.args.push(castArgument(arg));
            extract.raw.args.push(arg);
        }
    });
    extract.raw = utils.mergeObjects(extract.raw, {
        drop: function() {
            return extract.drop.apply(extract, arguments);
        },
        has: extract.has,
        get: extract.get
    });
    return extract;
};

/**
 * Cast a string argument to its typed equivalent.
 *
 * @param  String  arg
 * @return Mixed
 */
function castArgument(arg) {
    "use strict";
    if (arg.match(/^-?\d+$/)) {
        return parseInt(arg, 10);
    } else if (arg.match(/^-?\d+\.\d+$/)) {
        return parseFloat(arg);
    } else if (arg.match(/^(true|false)$/i)) {
        return arg.trim().toLowerCase() === "true" ? true : false;
    } else {
        return arg;
    }
}
