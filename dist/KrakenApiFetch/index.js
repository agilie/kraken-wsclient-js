"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isomorphic_ws_1 = __importDefault(require("isomorphic-ws"));
var KrakenApiFetch = /** @class */ (function () {
    function KrakenApiFetch() {
        var pairs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pairs[_i] = arguments[_i];
        }
        this.KRAKEN_SOCKET_URL = 'wss://ws.kraken.com';
        this._getPrices = {};
        this._expectedPairs = pairs;
        this._socket = new isomorphic_ws_1.default(this.KRAKEN_SOCKET_URL);
    }
    KrakenApiFetch.prototype.fetch = function () {
        var _this = this;
        this._socket.onopen = this._subscribeForPrices.bind(this);
        this._socket.onclose = this._handleClose.bind(this);
        this._socket.onmessage = this._handleMessage.bind(this);
        this._socket.onerror = this._handleError.bind(this);
        return new Promise(function (resolve, reject) {
            _this._promiseResolve = resolve;
            _this._promiseReject = reject;
        });
    };
    KrakenApiFetch.prototype._closeChannel = function () {
        try {
            this._socket.close();
            this._promiseResolve(this._getPrices);
        }
        catch (e) {
            console.log('close socket error', e);
            this._promiseReject(e);
        }
    };
    KrakenApiFetch.prototype._subscribeForPrices = function () {
        var priceSubscribeMessage = {
            event: 'subscribe',
            pair: this._expectedPairs,
            subscription: {
                name: 'spread',
            },
        };
        this._socket.send(JSON.stringify(priceSubscribeMessage));
    };
    KrakenApiFetch.prototype._handleMessage = function (event) {
        var payload = JSON.parse(event.data);
        try {
            if (Array.isArray(payload)) {
                if (this._isPriceValid(payload)) {
                    var channelID = payload[0], _a = payload[1], price = _a[0], otherPrices = _a.slice(1), channelName = payload[2], pair = payload[3];
                    if (!this._expectedPairs.includes(pair)) {
                        return; // no reason to handle something we didn't expect
                    }
                    this._getPrices[pair] = price;
                    if (this._expectedPairs.length === Object.keys(this._getPrices).length) {
                        this._closeChannel(); // after we receive all prices => unsubscribe
                    }
                }
            }
        }
        catch (e) {
            console.log('***** err *****');
            console.error('Received data seems to be incorrect');
            console.error(event.data, e);
            console.log('***** err *****');
        }
    };
    // for debug only
    KrakenApiFetch.prototype._handleClose = function (event) {
        // if (event.wasClean) {
        //     console.log('Connection closed');
        // } else {
        //     console.log('Connection terminated');
        // }
        // console.log('Code:', event.code, 'Reason:', event.reason);
    };
    KrakenApiFetch.prototype._handleError = function (error) {
        console.log('socket error', error);
        this._closeChannel();
    };
    KrakenApiFetch.prototype._isPriceValid = function (data) {
        var channelID = data[0], _a = data[1], price = _a[0], otherPrices = _a.slice(1), channelName = data[2], pair = data[3];
        return data[1] && price && !Number.isNaN(price) && price > 0;
    };
    return KrakenApiFetch;
}());
exports.default = KrakenApiFetch;
//# sourceMappingURL=index.js.map