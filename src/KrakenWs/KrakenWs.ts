import { SubscribeForPriceEvent } from './types/SubscribeForPriceEvent';
import { SupPairs } from './types/SupPairs';
import { DataTrades, DataSpread } from './types/PublicData';

export default class KrakenWs {
    ws: any;
    private KRAKEN_SOCKET_URL = 'wss://ws.kraken.com';

    private readonly _socket!: WebSocket;
    private readonly _expectedPairs!: SupPairs[];
    private readonly _method!: string;

    private _promiseResolve?;
    private _promiseReject?;

    private _getPrices: { [key in SupPairs]?: string } = {};

    constructor(pairs: SupPairs[], method: string) {
        this._expectedPairs = pairs;
        this._method = method;
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
                name: this._method,
            },
        };

        this._socket.send(JSON.stringify(priceSubscribeMessage));
    }

    private _handleMessage(event: MessageEvent): void {
        const payload = JSON.parse(event.data as string);
        console.log(payload);
        try {
            if (this._isPriceValid(payload)) {
                console.log('valid')
                switch (this._method) {
                    case 'spread':
                        this.getSpread( payload );
                        break;
                    case 'trade':
                        this.getTrade( payload );
                        break;
                }
            }
        } catch (e) {
            console.log('***** err *****');
            console.error('Received data seems to be incorrect');
            console.error(event.data, e);
            console.log('***** err *****');
        }
    }

    private getTrade( data: DataTrades ): void {
        // TODO
        // this method should work
    }
    private getSpread( data: DataSpread ): void {
        const [channelID, [price, ...otherPrices], channelName, pair] = data;

        if (!this._expectedPairs.includes(pair)) {
            return; // no reason to handle something we didn't expect
        }

        this._getPrices[pair] = price;

        if (this._expectedPairs.length === Object.keys(this._getPrices).length) {
            this._closeChannel(); // after we receive all prices => unsubscribe
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
        const [channelID, dataArray, channelName, pair] = data;

        if (
            channelName !== this._method ||
            !Array.isArray(dataArray) ||
            !Object.values(SupPairs).includes( pair )
        ) {
            return false;
        }

        if (channelName === 'spread') {
            const [bidPrice, ...otherPrices] = dataArray;
            return data[1] && bidPrice && !Number.isNaN(bidPrice) && bidPrice > 0;
        }
        if (channelName === 'trade') {
            dataArray.some((item: any[]) => {
                if ( Array.isArray(item) ) {
                    console.log( 'is_trade_array', item )
                    const [price, ...otherPrices] = item;
                    return data[1] && price && !Number.isNaN( price ) && price > 0;
                }
                return false;
            });
        }

    }
}
