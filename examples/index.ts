import { getTrades, getPrices, getTradesWs, SupPairs, setWS, setProxyUrl } from '../src/';

const WS = require('ws');

// Include WebSocket for your platform
setWS( WS );
// Include Proxy URL for client
setProxyUrl('https://cors-anywhere.herokuapp.com');

getPrices(SupPairs.ETH_USD, SupPairs.LTC_USD).then(data => {
    console.log('[sdata]', data);
});

getTrades({ pair: 'XXBTZUSD' }).then(data => {
    console.log('[data]', data);
});
