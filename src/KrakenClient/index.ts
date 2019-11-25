import request from 'request';

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

        const options = {
            method: 'POST',
            uri: url,
            json: true,
            body: data,
            headers,
        };

        return new Promise((resolve, reject) => {
            request(options, (err, httpResponse) => {
                const body = httpResponse.body;
                if (body.error && body.error.length) {
                    const error = body.error.filter(e => e.startsWith('E')).map(e => e.substr(1));

                    if (!error.length) {
                        throw new Error('Kraken API returned an unknown error');
                    }

                    reject(error.join(', '));
                }

                resolve(body.result);
            });
        });
    }
}
