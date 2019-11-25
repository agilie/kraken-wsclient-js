import request from 'request';
import axios, { AxiosRequestConfig } from 'axios';

import { Public, Private } from '../types/Methods';

export default class KrakenClient {
    private readonly url = 'https://api.kraken.com';
    private readonly version = 0;

    public api(method: Public | Private, params: object = {}): Promise<any> {
        if (Object.values(Public).includes(Public[method])) {
            return this.publicMethod(method as Public, params);
        } else if (Object.values(Private).includes(Private[method])) {
            return this.privateMethod(method as Private);
        } else {
            throw new Error(method + ' is not a valid API method.');
        }
    }

    private publicMethod(method: Public, params: object): Promise<any> {
        const url = `${this.url}/${this.version}/public/${method}`;
        return this.request(url, {}, params);
    }

    private privateMethod(method: Private): Promise<any> {
        // TODO
        return Promise.reject();
    }

    private request(url: string, headers: object, data: object): Promise<any> {
        // Set custom User-Agent string
        headers['User-Agent'] = 'Kraken Javascript API Client';

        const options: AxiosRequestConfig = {
            method: 'POST',
            headers,
            data: data,
            responseType: 'json',
            url,
        };

        return axios(options).then(({ data }) => {
            if (data.error && data.error.length) {
                const error = data.error.filter(e => e.startsWith('E')).map(e => e.substr(1));

                if (!error.length) {
                    throw new Error('Kraken API returned an unknown error');
                }
                throw new Error(error.join(', '));
            }
            return data.result;
        });
    }
}
