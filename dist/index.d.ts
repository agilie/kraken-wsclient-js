import KrakenWs from './KrakenWs';
import { SupPairs } from './types/SupPairs';
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
export { KrakenWs };
export declare function getPrices(...prices: SupPairs[]): Promise<any>;
export declare function getTime(): Promise<any>;
export declare function getAssets(params?: ParamsAssets): Promise<any>;
export declare function getAssetPairs(params?: ParamsAssetPairs): Promise<any>;
export declare function getTicker(params: ParamsTicker): Promise<any>;
export declare function getOHLC(params: ParamsOHLC): Promise<any>;
export declare function getOrderBook(params: ParamsOrderBook): Promise<any>;
export declare function getTrades(params: ParamsTrades): Promise<any>;
export declare function getSpread(params: ParamsSpread): Promise<any>;
