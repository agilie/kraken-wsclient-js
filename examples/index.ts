import { getPrices, SupPairs } from '../dist/';

// getPrices(SupPairs.ETH_USD, SupPairs.LTC_USD).then(data => {
//     console.log('[data]', data);
// });

getTicker({ pair: 'XXBTZUSD' }).then(data => {
    console.log('[data]', data);
});
