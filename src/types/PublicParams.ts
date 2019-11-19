export interface ParamsAssets {
    info?: 'info';
    aclass?: string;
    asset?: string;
}
export interface ParamsAssetPairs {
    info?: 'info' | 'leverage' | 'fees' | 'margin';
    pair?: string;
}
export interface ParamsTicker {
    pair: string;
}

export interface ParamsOHLC {
    pair: string;
    interval?: 1 | 5 | 15 | 30 | 60 | 240 | 1440 | 10080 | 21600;
    since?: number;
}

export interface ParamsOrderBook {
    pair: string;
    count?: number;
}
export interface ParamsTrades {
    pair: string;
    since?: number;
}
export interface ParamsSpread {
    pair: string;
    since?: number;
}
