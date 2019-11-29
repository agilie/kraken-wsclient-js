export interface DataTime {
    unixtime: number;
    rfc1123: string;
}
export interface DataAsset {
    altname: string;
    aclass: string;
    decimals: number;
    display_decimals: number;
}
export interface DataPair {
    altname: string;
    wsname: string;
    aclass_base: string;
    base: string;
    aclass_quote: string;
    quote: string;
    lot: string;
    pair_decimals: number;
    lot_decimals: number;
    lot_multiplier: number;
    leverage_buy: any[];
    leverage_sell: any[];
    fees: Array<[number, number, number]>;
    fees_maker: Array<[number, number, number]>;
    fee_volume_currency: string;
    margin_call: number;
    margin_stop: number;
}
export interface DataTicker {
    [pairName: string]: {
        a: Array<[string, string, string]>;
        b: Array<[string, string, string]>;
        c: Array<[string, string]>;
        v: Array<[string, string]>;
        p: Array<[string, string]>;
        t: Array<[number, number]>;
        l: Array<[string, string]>;
        h: Array<[string, string]>;
        o: Array<[string]>;
    };
}
export interface DataOHLC {
    [pairName: string]: Array<[number, string, string, string, string, string, string, number]>;
}
export interface DataOrderBook {
    [pairName: string]: {
        asks: Array<[string, string, number]>;
        bids: Array<[string, string, number]>;
    };
}
export interface DataTrades {
    [pairName: string]: Array<[string, string, number, string, string, string]>;
}
export interface DataSpread {
    [pairName: string]: Array<[number, string, string]>;
}
