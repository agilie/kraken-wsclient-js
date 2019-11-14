import { getPrices, SupPairs } from '../src/index';

getPrices(SupPairs.ETH_USD, SupPairs.LTC_USD).then(data => {
    console.log('[data]', data);
});
