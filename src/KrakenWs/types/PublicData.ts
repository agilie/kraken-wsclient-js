import { SupPairs } from './SupPairs';

export type DataSpread = [
        number,
        [string, string, string, string, string],
        'spread',
        SupPairs
    ];

export type DataTrades = [
        number,
        Array<[string, string, string, string, string, string]>,
        'trade',
        SupPairs
    ];
