import KrakenWs from './KrakenWs';
import KrakenClient from './KrakenClient';
import { SupPairs } from './types/SupPairs';
import { Public, Private } from './types/Methods';

import {
    ParamsAssets,
    ParamsAssetPairs,
    ParamsTicker,
    ParamsOHLC,
    ParamsOrderBook,
    ParamsTrades,
    ParamsSpread,
} from './types/PublicParams';

export * from './types/SubscribeForPriceEvent';
export * from './types/SupPairs';

const client = new KrakenClient();

export function getPrices(...prices: SupPairs[]): Promise<any> {
    const Kraken = new KrakenWs(...prices);
    return Kraken.fetch();
}

export function getTime(): Promise<any> {
    return client.api(Public.Time);
}

export function getAssets(params?: ParamsAssets): Promise<any> {
    return client.api(Public.Assets, params);
}

export function getAssetPairs(params?: ParamsAssetPairs): Promise<any> {
    return client.api(Public.AssetPairs, params);
}

export function getTicker(params: ParamsTicker): Promise<any> {
    return client.api(Public.Ticker, params);
}

export function getOHLC(params: ParamsOHLC): Promise<any> {
    return client.api(Public.OHLC, params);
}

export function getOrderBook(params: ParamsOrderBook): Promise<any> {
    return client.api(Public.Depth, params);
}

export function getTrades(params: ParamsTrades): Promise<any> {
    return client.api(Public.Trades, params);
}

export function getSpread(params: ParamsSpread): Promise<any> {
    return client.api(Public.Spread, params);
}
