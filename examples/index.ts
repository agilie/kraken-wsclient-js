import { getTicker, getPrices, SupPairs, KrakenWs } from '../src/';

const WS = require('ws');
//const WS = require('nativescript-websockets');

KrakenWs.prototype.ws = WS;

console.log(KrakenWs.prototype);

getPrices(SupPairs.ETH_USD, SupPairs.LTC_USD).then(data => {
    console.log('[data]', data);
});

getTicker({ pair: 'XXBTZUSD' }).then(data => {
    console.log('[data]', data);
});
