import axios from 'axios';
import {api_url, api_version} from '../settings';
import {store} from './store';
import {internetStatus} from './actions';
import NetInfo from '@react-native-community/netinfo';

/**
 *
 */
class Api {

    token;
    netInfo;
    instance;
    static self;
    static _singleton = '1ksgjopa390ksfdfs3r32y3w45u';

    /**
     *
     */
    constructor(singleton) {
        if (singleton !== Api._singleton) {
            throw new Error('Api class is singleton');
        }

        const state = store.getState();
        this.token = state.token;

        // Subscribe net info
        this.netInfo = NetInfo.addEventListener(state => {
            store.dispatch(internetStatus(state.isInternetReachable));
        });

        this._createInstance();
    }

    /**
     *
     */
    _createInstance() {
        this.instance = axios.create({
            baseURL: Api._getApiUrl(),
            timeout: 3000,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${this.token}`,
            },
        });
    }

    /**
     *
     * @returns {string}
     * @private
     */
    static _getApiUrl() {
        const prepared_url = api_url.replace('//', '/');
        return (prepared_url.substring(-1) === '/' ?
            prepared_url : prepared_url + '/') + api_version + '/';
    }

    /**
     *
     * @returns {*}
     */
    static make() {
        if (Api.self) {
            return Api.self;
        } else {
            Api.self = new Api(Api._singleton);
        }
        return Api.self;
    }

    /**
     * @param url
     * @param data
     * @param withCatch
     */
    post(url, data, withCatch = true) {

        let postRequest = this.instance.post({
            url: url,
            data: data,
        });

        if (withCatch) {
            postRequest.catch((err) => {
                console.log(err);
            });
        }
        return postRequest;
    }
}

export default Api;
