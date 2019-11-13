import WebSocket, { CloseEvent, MessageEvent, ErrorEvent } from 'ws';
import { SubscribeForPriceEvent, supportedPairs, CoinType } from './interface';
// import { CoinType, SubscribeForPriceEvent, supportedPairs } from './index.d.ts';

// export const supportedPairs;

export * from './interface';

export default class Kraken {
    private KRAKEN_SOCKET_URL = 'wss://ws.kraken.com';
    UPDATE_INTERVAL = 15 * 60 * 1000; // 15min

    private _apiCodes: any = {
        'XBT/USD': [CoinType.BTC],
        'ETH/USD': [CoinType.ETH],
        'LTC/USD': [CoinType.LTC],
        'DASH/USD': [CoinType.DASH],
        'ZEC/USD': [CoinType.ZEC],
    };

    private _socket: WebSocket;

    private _promiseResolve?;
    private _promiseReject?;

    private _expectedData!: string[];

    private _selectPairs: supportedPairs[];

    private _getPrices: any[];

    constructor() {}

    connect(): Promise<any> {
        this._getPrices = [];
        this._expectedData = Object.keys(this._apiCodes);

        this._socket = new WebSocket(this.KRAKEN_SOCKET_URL);

        this._socket.onopen = this._subscribeForPrices.bind(this);
        this._socket.onclose = this._handleClose.bind(this);
        this._socket.onmessage = this._handleMessage.bind(this);
        this._socket.onerror = this._handleError.bind(this);

        return new Promise((resolve, reject) => {
            this._promiseResolve = resolve;
            this._promiseReject = reject;
        });
    }

    get(...pairs: supportedPairs[]): Promise<any> {
        this._selectPairs = pairs;
        return this.connect();
    }

    private _closeChannel(): void {
        try {
            this._socket.close();
            this._socket = undefined;
        } catch (e) {
            console.log('close socket error', e);
        }
        //setTimeout(this.watchForPrice.bind(this), this.UPDATE_INTERVAL);
    }

    private _subscribeForPrices(): void {
        const priceSubscribeMessage: SubscribeForPriceEvent = {
            event: 'subscribe',
            pair: this._selectPairs,
            subscription: {
                name: 'spread',
            },
        };

        this._socket.send(JSON.stringify(priceSubscribeMessage));
    }

    private _handleMessage(event: MessageEvent): void {
        const payload = JSON.parse(event.data as string);

        if (Array.isArray(payload)) {
            console.log('array->', payload);

            try {
                //
                if (this._isPriceValid(payload)) {
                    const [channelID, [price, ...otherPrices], channelName, currency] = payload;

                    if (!this._expectedData.includes(currency)) {
                        return; // no reason to handle something we didn't expect
                    }

                    const currencyName = this._apiCodes[currency];
                    this._getPrices[currencyName] = price;

                    this._expectedData = this._expectedData.filter(v => v !== currency);

                    if (this._expectedData.length === 0) {
                        this._closeChannel(); // after we receive all prices => unsubscribe
                        this._promiseResolve(this._getPrices);
                    }
                }
            } catch (e) {
                console.log('***** err *****');
                console.log('***** err *****');
                console.log('***** err *****');
                console.log('Received data seems to be incorrect');
                console.log(event.data, e);
                console.log('***** err *****');
                console.log('***** err *****');
                console.log('***** err *****');
            }
        } else {
            console.log('!array->', payload);
        }
    }

    // for debug only
    private _handleClose(event: CloseEvent): void {
        // if (event.wasClean) {
        //     console.log('Connection closed');
        // } else {
        //     console.log('Connection terminated');
        // }
        // console.log('Code:', event.code, 'Reason:', event.reason);
    }

    private _handleError(error: ErrorEvent): void {
        console.log('socket error', error);
        this._closeChannel();
    }

    private _isPriceValid(data: any): boolean {
        const [channelID, [price, ...otherPrices], channelName, currency] = data;

        return price && !Number.isNaN(price) && price > 0;
    }
}
