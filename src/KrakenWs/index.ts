import KrakenWs from './KrakenWs';
import { SupPairs } from './types/SupPairs';

export * from './types/SubscribeForPriceEvent';
export * from './types/SupPairs';

export function setWS( WS: WebSocket ): void {
    KrakenWs.prototype.ws = WS;
}

export function getPrices(...prices: SupPairs[]): Promise<{ [key in SupPairs]?: string }> {
    const Kraken = new KrakenWs(prices, 'spread');
    return Kraken.fetch();
}

export function getTradesWs(...prices: SupPairs[]): Promise<{ [key in SupPairs]?: string }> {
    const Kraken = new KrakenWs(prices, 'trade');
    return Kraken.fetch();
}
