import { SupPairs } from './types/SupPairs';
export * from './types/SubscribeForPriceEvent';
export * from './types/SupPairs';
export declare function getPrices(...prices: SupPairs[]): Promise<any>;
