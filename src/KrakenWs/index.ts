import KrakenWs from './KrakenWs';
import { SupPairs } from './types/SupPairs';

export * from './types/SubscribeForPriceEvent';
export * from './types/SupPairs';

export { KrakenWs };

export function getPrices(...prices: SupPairs[]): Promise<{ [key in SupPairs]?: string }> {
    const Kraken = new KrakenWs(prices);
    return Kraken.fetch();
}
