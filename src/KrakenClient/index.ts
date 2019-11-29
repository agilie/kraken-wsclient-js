import KrakenClient from './KrakenClient';
import { Public } from './types/Methods';

import {
    ParamsAssets,
    ParamsAssetPairs,
    ParamsTicker,
    ParamsOHLC,
    ParamsOrderBook,
    ParamsTrades,
    ParamsSpread,
} from './types/PublicParams';
import { DataTime, DataAsset, DataPair, DataTicker, DataOHLC, DataOrderBook, DataTrades, DataSpread } from './types/PublicData';

const client = new KrakenClient();

export function getTime(): Promise<DataTime> {
    return client.api(Public.Time);
}

export function getAssets(params?: ParamsAssets): Promise<DataAsset[]> {
    return client.api(Public.Assets, params);
}

export function getAssetPairs(params?: ParamsAssetPairs): Promise<DataPair[]> {
    return client.api(Public.AssetPairs, params);
}

export function getTicker(params: ParamsTicker): Promise<DataTicker> {
    return client.api(Public.Ticker, params);
}

export function getOHLC(params: ParamsOHLC): Promise<DataOHLC> {
    return client.api(Public.OHLC, params);
}

export function getOrderBook(params: ParamsOrderBook): Promise<DataOrderBook> {
    return client.api(Public.Depth, params);
}

export function getTrades(params: ParamsTrades): Promise<DataTrades> {
    return client.api(Public.Trades, params);
}

export function getSpread(params: ParamsSpread): Promise<DataSpread> {
    return client.api(Public.Spread, params);
}
