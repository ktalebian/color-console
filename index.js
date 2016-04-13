'use strict';

var colors = require('colors');
var util = require('util');
var countBuffer = {};

var _console = {};
// Expose console
module.exports = _console;

// This is the setup
_console.colors = {
    info: {
        text: 'blue',
        bg: null
    },
    debug: {
        text: 'black',
        bg: 'bgWhite'
    },
    warn: {
        text: 'yellow',
        bg: null
    },
    error: {
        text: 'red',
        bg: null
    },
    highlight: {
        text: 'black',
        bg: 'bgYellow'
    },
    count: {
        text: 'cyan',
        bg: null
    }
};

_console.log = function() {
    console.log.apply(this, arguments);
};

_console.dir = function(){
    console.dir.apply(this, arguments);
};

_console.clear = function(){
    process.stdout.write('\u001B[2J\u001B[0;0f');
};

_console.info = function() {
    logWithColor('info', arguments);
};

_console.warn = function() {
    logWithColor('warn', arguments);
};

_console.error = function() {
    logWithColor('error', arguments);
};

_console.debug = function() {
    logWithColor('debug', arguments);
};

_console.highlight = function() {
    logWithColor('highlight', arguments);
};

_console.count = function() {
    var args = {};
    for (var key in arguments) {
        if (!arguments.hasOwnProperty(key)) continue;


        var prop = arguments[key];

        prop = prop.toString && prop.toString();
        if (prop in countBuffer) {
            countBuffer[prop] += 1;
        } else {
            countBuffer[prop] = 0;
        }

        arguments[key] = prop + ": " + countBuffer[prop];
    }
    logWithColor('count', arguments);
};

function logWithColor(lookup, args) {
    var color = _console.colors[lookup];
    if (!color) {
        console.log(args);
    } else {
        args = util.format.apply(util, args);

        var textColor = color.text;
        var bgColor = color.bg;

        if (textColor) {
            args = colors[textColor](args);
        }
        if (bgColor) {
            args = colors[bgColor](args);
        }

        console.log(args);
    }
}
