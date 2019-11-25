"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var Methods_1 = require("../types/Methods");
var KrakenClient = /** @class */ (function () {
    function KrakenClient() {
        this.url = 'https://api.kraken.com';
        this.version = 0;
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
        // Set custom User-Agent string
        headers['User-Agent'] = 'Kraken Javascript API Client';
        var options = {
            method: 'POST',
            headers: headers,
            data: data,
            responseType: 'json',
            url: url,
        };
        return axios_1.default(options).then(function (_a) {
            var data = _a.data;
            if (data.error && data.error.length) {
                var error = data.error.filter(function (e) { return e.startsWith('E'); }).map(function (e) { return e.substr(1); });
                if (!error.length) {
                    throw new Error('Kraken API returned an unknown error');
                }
                throw new Error(error.join(', '));
            }
            return data.result;
        });
    };
    return KrakenClient;
}());
exports.default = KrakenClient;
//# sourceMappingURL=index.js.map