import Kraken, { CoinType, supportedPairs } from '../dist/index';

const kra = new Kraken();

kra.get(supportedPairs.ETH_USD, supportedPairs.ETH_USD).then(data => {
    console.log('[data]', data);
});
