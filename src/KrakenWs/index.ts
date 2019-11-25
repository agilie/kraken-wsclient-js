import { SubscribeForPriceEvent } from '../types/SubscribeForPriceEvent';
import { SupPairs } from '../types/SupPairs';

export default class KrakenWs {
    ws: any;
    private KRAKEN_SOCKET_URL = 'wss://ws.kraken.com';

    private readonly _socket!: WebSocket;
    private readonly _expectedPairs!: SupPairs[];

    private _promiseResolve?;
    private _promiseReject?;

    private _getPrices: { [key in SupPairs]?: string } = {};

    constructor(...pairs: SupPairs[]) {
        this._expectedPairs = pairs;
        this._socket = new this.ws(this.KRAKEN_SOCKET_URL);
    }

    fetch(): Promise<any> {
        this._socket.onopen = this._subscribeForPrices.bind(this);
        this._socket.onclose = this._handleClose.bind(this);
        this._socket.onmessage = this._handleMessage.bind(this);
        this._socket.onerror = this._handleError.bind(this);

        return new Promise((resolve, reject) => {
            this._promiseResolve = resolve;
            this._promiseReject = reject;
        });
    }

    private _closeChannel(): void {
        try {
            this._socket.close();
            this._promiseResolve(this._getPrices);
        } catch (e) {
            console.log('close socket error', e);
            this._promiseReject(e);
        }
    }

    private _subscribeForPrices(): void {
        const priceSubscribeMessage: SubscribeForPriceEvent = {
            event: 'subscribe',
            pair: this._expectedPairs,
            subscription: {
                name: 'spread',
            },
        };

        this._socket.send(JSON.stringify(priceSubscribeMessage));
    }

    private _handleMessage(event: MessageEvent): void {
        const payload = JSON.parse(event.data as string);
        try {
            if (Array.isArray(payload)) {
                if (this._isPriceValid(payload)) {
                    const [channelID, [price, ...otherPrices], channelName, pair] = payload;

                    if (!this._expectedPairs.includes(pair)) {
                        return; // no reason to handle something we didn't expect
                    }

                    this._getPrices[pair] = price;

                    if (this._expectedPairs.length === Object.keys(this._getPrices).length) {
                        this._closeChannel(); // after we receive all prices => unsubscribe
                    }
                }
            }
        } catch (e) {
            console.log('***** err *****');
            console.error('Received data seems to be incorrect');
            console.error(event.data, e);
            console.log('***** err *****');
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
        const [channelID, [price, ...otherPrices], channelName, pair] = data;

        return data[1] && price && !Number.isNaN(price) && price > 0;
    }
}
