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
var jss = require("jss-cli");
var util_1 = require("util");
var symbols = require("log-symbols");
var utils_1 = require("./utils");
var readdir = util_1.promisify(fs.readdir);
var writeFile = util_1.promisify(fs.writeFile);
var inDir = process.argv[2];
var outDir = process.argv[3];
var subDir = '';
if (inDir.charAt(inDir.length - 1) === '/') {
    inDir = inDir.slice(0, inDir.length - 1);
}
if (outDir.charAt(outDir.length - 1) === '/') {
    outDir = outDir.slice(0, outDir.length - 1);
}
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}
if (!fs.existsSync(outDir + '/' + subDir)) {
    fs.mkdirSync(outDir + '/' + subDir);
}
var generate = function (above, dir) {
    var thisPath = above + '/' + dir;
    return new Promise(function (resolve) {
        readdir(thisPath)
            .then(function (files) { return __awaiter(void 0, void 0, void 0, function () {
            var out, _i, files_1, file, temp;
            return __generator(this, function (_a) {
                out = [];
                for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
                    file = files_1[_i];
                    temp = fs.readFileSync(thisPath + file, 'utf8');
                    out.push({
                        name: file.split('.css')[0] + '.json',
                        content: jss.cssToJss({ code: temp })['@global']
                    });
                }
                resolve(out);
                return [2 /*return*/];
            });
        }); })["catch"](function (error) { return console.log('ERROR:', error); });
    });
};
var run = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
                var out, _a, _b, _c, _d, _loop_1, _i, out_1, file;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            console.log(utils_1.yellow('Locating CSS files\n'));
                            _b = (_a = JSON).parse;
                            _d = (_c = JSON).stringify;
                            return [4 /*yield*/, generate(inDir, '')];
                        case 1:
                            out = _b.apply(_a, [_d.apply(_c, [_e.sent()])]);
                            utils_1.timedLog('', utils_1.blue(symbols.info), 'Grabbed all CSS files');
                            console.log();
                            _loop_1 = function (file) {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, writeFile(outDir + '/' + file.name, JSON.stringify(file.content, null, 2))
                                                .then(function (result) {
                                                utils_1.timedLog('', utils_1.green(symbols.success), utils_1.green('Wrote ->'), utils_1.blue(file.name));
                                            })["catch"](function (err) {
                                                if (err) {
                                                    utils_1.timedLog('', utils_1.red(symbols.error), 'Error in writing .json file');
                                                    throw new Error(err.message);
                                                }
                                            })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            _i = 0, out_1 = out;
                            _e.label = 2;
                        case 2:
                            if (!(_i < out_1.length)) return [3 /*break*/, 5];
                            file = out_1[_i];
                            return [5 /*yield**/, _loop_1(file)];
                        case 3:
                            _e.sent();
                            _e.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5:
                            resolve();
                            return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, run()];
            case 1:
                _a.sent();
                console.log();
                return [2 /*return*/];
        }
    });
}); };
main();
