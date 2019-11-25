import { Public, Private } from '../types/Methods';
export default class KrakenClient {
    private readonly url;
    private readonly version;
    api(method: Public | Private, params?: object): Promise<any>;
    private publicMethod;
    private privateMethod;
    private request;
}
