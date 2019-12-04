import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { Public, Private } from './types/Methods';

export default class KrakenClient {
    proxyUrl: string;
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

    public setProxyUrl( url: string ): void {
        this.proxyUrl = url + '/';
    }

    private publicMethod <T>(method: Public, params: object): Promise<T> {
        const url = `${this.proxyUrl || ''}${this.url}/${this.version}/public/${method}`;
        return this.request(url, {}, params);
    }

    private privateMethod <T>(method: Private): Promise<T> {
        /**
         * TODO
         * It will be great to develop Private methods in Kraken API
         */
        return Promise.reject();
    }

    private request <T>(url: string, headers: object, data: object): Promise<T> {
        const options: AxiosRequestConfig = {
            method: 'POST',
            responseType: 'json',
            headers: {
                'Origin': this.url + '/',
                ...headers,
            },
            params: data,
            url,
        };

        return axios(options).then((response: AxiosResponse) => {
            if (response.data.error && response.data.error.length) {
                const error = response.data.error.filter(e => e.startsWith('E')).map(e => e.substr(1));

                if (!error.length) {
                    throw new Error('Kraken API returned an unknown error');
                }
                throw new Error(error.join(', '));
            }
            return response.data.result;
        }).catch(( err: any ) => {
            console.error(err);
        });
    }
}
