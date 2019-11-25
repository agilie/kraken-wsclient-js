"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var KrakenWs_1 = __importDefault(require("./KrakenWs"));
exports.KrakenWs = KrakenWs_1.default;
var KrakenClient_1 = __importDefault(require("./KrakenClient"));
var Methods_1 = require("./types/Methods");
__export(require("./types/SupPairs"));
var client = new KrakenClient_1.default();
function getPrices() {
    var prices = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        prices[_i] = arguments[_i];
    }
    var Kraken = new KrakenWs_1.default(prices);
    return Kraken.fetch();
}
exports.getPrices = getPrices;
function getTime() {
    return client.api(Methods_1.Public.Time);
}
exports.getTime = getTime;
function getAssets(params) {
    return client.api(Methods_1.Public.Assets, params);
}
exports.getAssets = getAssets;
function getAssetPairs(params) {
    return client.api(Methods_1.Public.AssetPairs, params);
}
exports.getAssetPairs = getAssetPairs;
function getTicker(params) {
    return client.api(Methods_1.Public.Ticker, params);
}
exports.getTicker = getTicker;
function getOHLC(params) {
    return client.api(Methods_1.Public.OHLC, params);
}
exports.getOHLC = getOHLC;
function getOrderBook(params) {
    return client.api(Methods_1.Public.Depth, params);
}
exports.getOrderBook = getOrderBook;
function getTrades(params) {
    return client.api(Methods_1.Public.Trades, params);
}
exports.getTrades = getTrades;
function getSpread(params) {
    return client.api(Methods_1.Public.Spread, params);
}
exports.getSpread = getSpread;
//# sourceMappingURL=index.js.map