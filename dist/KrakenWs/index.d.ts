import { SupPairs } from '../types/SupPairs';
export default class KrakenWs {
    ws: any;
    private KRAKEN_SOCKET_URL;
    private readonly _socket;
    private readonly _expectedPairs;
    private _promiseResolve?;
    private _promiseReject?;
    private _getPrices;
    constructor(pairs: SupPairs[]);
    fetch(): Promise<any>;
    private _closeChannel;
    private _subscribeForPrices;
    private _handleMessage;
    private _handleClose;
    private _handleError;
    private _isPriceValid;
}
