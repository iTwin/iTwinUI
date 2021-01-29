"use strict";
exports.__esModule = true;
exports.red = function (text) { return "\u001B[31m" + text + "\u001B[0m"; };
exports.green = function (text) { return "\u001B[32m" + text + "\u001B[0m"; };
exports.yellow = function (text) { return "\u001B[33m" + text + "\u001B[0m"; };
exports.blue = function (text) { return "\u001B[34m" + text + "\u001B[0m"; };
exports.magenta = function (text) { return "\u001B[35m" + text + "\u001B[0m"; };
exports.clearConsole = function () { return process.stdout.write('\x1Bc'); };
var TIMED_LOG_START = process.hrtime();
exports.timedLog = function () {
    var note = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        note[_i] = arguments[_i];
    }
    var precision = 3;
    var elapsed = process.hrtime(TIMED_LOG_START)[1] / 1000000;
    console.log(note.join(' '), ' ', "[" + elapsed.toFixed(precision) + "ms]");
    TIMED_LOG_START = process.hrtime();
};
