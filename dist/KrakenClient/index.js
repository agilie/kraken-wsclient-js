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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var got_1 = __importDefault(require("got"));
var qs_1 = __importDefault(require("qs"));
var Methods_1 = require("../types/Methods");
var KrakenClient = /** @class */ (function () {
    function KrakenClient() {
        this.url = 'https://api.kraken.com';
        this.version = 0;
        this.timeout = 500;
    }
    KrakenClient.prototype.api = function (method, params) {
        if (params === void 0) { params = {}; }
        if (Object.values(Methods_1.Public).includes(Methods_1.Public[method])) {
            return this.publicMethod(method, params);
        }
        else if (Object.values(Methods_1.Private).includes(Methods_1.Private[method])) {
            return this.privateMethod(method);
        }
        else {
            throw new Error(method + ' is not a valid API method.');
        }
    };
    KrakenClient.prototype.publicMethod = function (method, params) {
        var url = this.url + "/" + this.version + "/public/" + method;
        return this.request(url, {}, params);
    };
    KrakenClient.prototype.privateMethod = function (method) {
        // TODO
        return Promise.reject();
    };
    KrakenClient.prototype.request = function (url, headers, data) {
        return __awaiter(this, void 0, void 0, function () {
            var options, response, body, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Set custom User-Agent string
                        headers['User-Agent'] = 'Kraken Javascript API Client';
                        options = {
                            method: 'POST',
                            body: qs_1.default.stringify(data),
                            headers: headers,
                            timeout: this.timeout,
                        };
                        return [4 /*yield*/, got_1.default(url, options)];
                    case 1:
                        response = _a.sent();
                        body = JSON.parse(response.body);
                        if (body.error && body.error.length) {
                            error = body.error.filter(function (e) { return e.startsWith('E'); }).map(function (e) { return e.substr(1); });
                            if (!error.length) {
                                throw new Error('Kraken API returned an unknown error');
                            }
                            throw new Error(error.join(', '));
                        }
                        return [2 /*return*/, body];
                }
            });
        });
    };
    return KrakenClient;
}());
exports.default = KrakenClient;
//# sourceMappingURL=index.js.map