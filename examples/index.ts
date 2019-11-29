import { getSpread, getPrices, SupPairs, KrakenWs } from '../src/';

const WS = require('ws');

KrakenWs.prototype.ws = WS;

console.log(KrakenWs.prototype);

getPrices(SupPairs.ETH_USD, SupPairs.LTC_USD).then(data => {
    console.log('[sdata]', data);
});

getSpread({ pair: 'XXBTZUSD' }).then(data => {
    console.log('[data]', data);
});
