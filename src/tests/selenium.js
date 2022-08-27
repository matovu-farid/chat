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
var selenium_webdriver_1 = require("selenium-webdriver");
var chrome_1 = require("selenium-webdriver/chrome");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var options, driver, buttons, promises_1, buttonNames, googleButton, inputElement, passWordElement;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = new chrome_1["default"].Options();
                options.addArguments("user-data-dir=/home/farid/.config/google-chrome");
                options.addArguments("profile-directory='Profile 1'");
                driver = new selenium_webdriver_1.Builder()
                    .forBrowser(selenium_webdriver_1.Browser.CHROME)
                    .setChromeOptions(options)
                    // .setFirefoxOptions(/* ... */)
                    .build();
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 12, 13]);
                return [4 /*yield*/, driver.get("http://localhost:3000")];
            case 2:
                _a.sent();
                return [4 /*yield*/, driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.className("button")), 30000, "Timed out after 30 seconds", 2000)];
            case 3:
                _a.sent();
                return [4 /*yield*/, driver.findElements(selenium_webdriver_1.By.css(".button"))];
            case 4:
                buttons = _a.sent();
                promises_1 = [];
                buttons.forEach(function (button) {
                    promises_1.push(button.getText());
                });
                return [4 /*yield*/, Promise.all(promises_1)];
            case 5:
                buttonNames = _a.sent();
                googleButton = buttons[0];
                return [4 /*yield*/, (googleButton === null || googleButton === void 0 ? void 0 : googleButton.click())];
            case 6:
                _a.sent();
                return [4 /*yield*/, driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.css("input")), 30000, "Timed out after 30 seconds", 2000)];
            case 7:
                inputElement = _a.sent();
                return [4 /*yield*/, inputElement.sendKeys("apptest1000.000@gmail.com", selenium_webdriver_1.Key.ENTER)];
            case 8:
                _a.sent();
                return [4 /*yield*/, driver.wait(function () {
                        var returned = false;
                        setTimeout(function () {
                            returned = true;
                        }, 10000);
                        return returned;
                    }, 15000)];
            case 9:
                _a.sent();
                console.log("waited........");
                return [4 /*yield*/, driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.css("[type='password']")), 30000, "Timed out after 30 seconds", 2000)];
            case 10:
                passWordElement = _a.sent();
                console.log(passWordElement);
                return [4 /*yield*/, passWordElement.sendKeys("Apptest90")];
            case 11:
                _a.sent();
                return [3 /*break*/, 13];
            case 12: return [7 /*endfinally*/];
            case 13: return [2 /*return*/];
        }
    });
}); })();
