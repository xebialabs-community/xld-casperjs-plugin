/*
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
 * FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.
 */
/*global exports, console, patchRequire, require:true*/

var require = patchRequire(require);
var fs = require('fs');
var utils = require('utils');
var env = require('system').env;

exports.create = function create(type) {
    "use strict";
    if (!type) {
        return;
    }
    if (!(type in exports)) {
        throw new Error(utils.format('Unsupported colorizer type "%s"', type));
    }
    return new exports[type]();
};

/**
 * This is a port of lime colorizer.
 * http://trac.symfony-project.org/browser/tools/lime/trunk/lib/lime.php
 *
 * (c) Fabien Potencier, Symfony project, MIT license
 */
var Colorizer = function Colorizer() {
    "use strict";
    var options    = { bold: 1, underscore: 4, blink: 5, reverse: 7, conceal: 8 };
    var foreground = { black: 30, red: 31, green: 32, yellow: 33, blue: 34, magenta: 35, cyan: 36, white: 37 };
    var background = { black: 40, red: 41, green: 42, yellow: 43, blue: 44, magenta: 45, cyan: 46, white: 47 };
    var styles     = {
        'ERROR':     { bg: 'red', fg: 'white', bold: true },
        'INFO':      { fg: 'green', bold: true },
        'TRACE':     { fg: 'green', bold: true },
        'PARAMETER': { fg: 'cyan' },
        'COMMENT':   { fg: 'yellow' },
        'WARNING':   { fg: 'red', bold: true },
        'GREEN_BAR': { fg: 'white', bg: 'green', bold: true },
        'RED_BAR':   { fg: 'white', bg: 'red', bold: true },
        'INFO_BAR':  { bg: 'cyan', fg: 'white', bold: true },
        'WARN_BAR':  { bg: 'yellow', fg: 'white', bold: true },
        'SKIP':      { fg: 'magenta', bold: true },
        'SKIP_BAR':  { bg: 'magenta', fg: 'white', bold: true }
    };

    /**
     * Adds a style to provided text.
     *
     * @param   String  text
     * @param   String  styleName
     * @return  String
     */
    this.colorize = function colorize(text, styleName, pad) {
        if ((fs.isWindows() && !env['ANSICON']) || !(styleName in styles)) {
            return text;
        }
        return this.format(text, styles[styleName], pad);
    };

    /**
     * Formats a text using a style declaration object.
     *
     * @param  String  text
     * @param  Object  style
     * @return String
     */
    this.format = function format(text, style, pad) {
        if ((fs.isWindows() && !env['ANSICON']) || !utils.isObject(style)) {
            return text;
        }
        var codes = [];
        if (style.fg && foreground[style.fg]) {
            codes.push(foreground[style.fg]);
        }
        if (style.bg && background[style.bg]) {
            codes.push(background[style.bg]);
        }
        for (var option in options) {
            if (option in style && style[option] === true) {
                codes.push(options[option]);
            }
        }
        // pad
        if (typeof pad === "number" && text.length < pad) {
            text += new Array(pad - text.length + 1).join(' ');
        }
        return "\u001b[" + codes.join(';') + 'm' + text + "\u001b[0m";
    };
};
exports.Colorizer = Colorizer;

/**
 * Dummy colorizer. Does basically nothing.
 *
 */
var Dummy = function Dummy() {
    "use strict";
    this.colorize = function colorize(text, styleName, pad) {
        return text;
    };
    this.format = function format(text, style, pad){
        return text;
    };
};
exports.Dummy = Dummy;
