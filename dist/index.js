"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var KrakenApiFetch_1 = __importDefault(require("./KrakenApiFetch"));
__export(require("./types/SupPairs"));
function getPrices() {
    var prices = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        prices[_i] = arguments[_i];
    }
    var Kraken = new (KrakenApiFetch_1.default.bind.apply(KrakenApiFetch_1.default, __spreadArrays([void 0], prices)))();
    return Kraken.fetch();
}
exports.getPrices = getPrices;
//# sourceMappingURL=index.js.map