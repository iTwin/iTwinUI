"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var node_sass_1 = require("node-sass");
var util_1 = require("util");
var symbols = require("log-symbols");
var utils_1 = require("./utils");
var ignorePaths = new RegExp('(.DS_Store)', 'gim');
utils_1.clearConsole();
console.log(utils_1.yellow('Compiling SCSS to CSS'));
console.log();
var path = './src';
var readdir = util_1.promisify(fs.readdir);
if (!fs.existsSync('./lib/')) {
    fs.mkdirSync('./lib/');
}
if (!fs.existsSync('./lib/css')) {
    fs.mkdirSync('./lib/css');
}
var renderSass = function (path, file) {
    return new Promise(function (resolve, reject) {
        node_sass_1.render({
            file: path
        }, function (err, result) {
            if (!err) {
                fs.writeFile("lib/css/" + file + ".css", result.css, function (err) {
                    if (err) {
                        console.log(symbols.error, 'Error in writing file');
                        reject(new Error(err.message));
                    }
                    else {
                        console.log('', utils_1.green(symbols.success), utils_1.green('Wrote ->'), utils_1.blue(file + '.css'));
                        resolve();
                    }
                });
            }
            else {
                throw new Error(err.message);
            }
        });
    });
};
readdir(path).then(function (files) { return __awaiter(void 0, void 0, void 0, function () {
    var count, _i, files_1, file, regExp, matchesScss, matchesBwc, matchesStyle, matchesIgnorePaths;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('', utils_1.blue(symbols.info), 'Read', utils_1.blue(path));
                count = 0;
                console.log();
                for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
                    file = files_1[_i];
                    regExp = new RegExp('.scss$', 'gim');
                    matchesScss = regExp.test(file);
                    regExp = new RegExp('^bwc', 'gim');
                    matchesBwc = regExp.test(file);
                    regExp = new RegExp('^style$', 'gim');
                    matchesStyle = regExp.test(file);
                    matchesIgnorePaths = ignorePaths.test(file);
                    if (!(matchesScss || matchesBwc || matchesStyle || matchesIgnorePaths)) {
                        renderSass(path + "/" + file + "/classes.scss", file)
                            .then(function (result) {
                            count++;
                        })["catch"](function (err) {
                            throw new Error(err.message);
                        });
                    }
                }
                return [4 /*yield*/, renderSass(path + "/classes.scss", 'all')
                        .then(function (result) {
                        count++;
                    })["catch"](function (err) {
                        throw new Error(err.message);
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, renderSass(path + "/style/global.scss", 'global')
                        .then(function (result) {
                        count++;
                    })["catch"](function (err) {
                        throw new Error(err.message);
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, renderSass(path + "/reset-global-styles.scss", 'reset-global-styles')
                        .then(function (result) {
                        count++;
                    })["catch"](function (err) {
                        throw new Error(err.message);
                    })];
            case 3:
                _a.sent();
                console.log();
                utils_1.timedLog('', utils_1.blue(symbols.info), 'Wrote', utils_1.blue(count), 'files');
                console.log();
                return [2 /*return*/];
        }
    });
}); });
