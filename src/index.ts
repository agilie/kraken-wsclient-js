import KrakenApiFetch from './KrakenApiFetch';
import { SupPairs } from './types/SupPairs';

export * from './types/SubscribeForPriceEvent';
export * from './types/SupPairs';

export function getPrices(...prices: SupPairs[]): Promise<any> {
    const Kraken = new KrakenApiFetch(...prices);
    return Kraken.fetch();
}
