export interface SubscribeForPriceEvent {
    event: string;
    pair: string[];
    subscription: {
        name: string;
    };
}
