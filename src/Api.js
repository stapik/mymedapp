import axios from 'axios';
import {api_version, app_id, app_secret, server_url} from '../settings';
import {store} from './store';
import {internetStatus, updateTokenInfo} from './actions';
import {Platform} from './constants';
import NetInfo from '@react-native-community/netinfo';
import {Toast} from 'native-base';

/**
 *
 */
class Api {

    netInfo;
    instance_api;
    api_url;
    server_url;
    sms_phone_number;
    static self;
    static token_info;
    static _singleton_key = '1ksgjopa390ksfdfs3r32y3w45u';

    /**
     * @param singleton
     */
    constructor(singleton) {
        if (singleton !== Api._singleton_key) {
            throw new Error('Api class is singleton');
        }

        // default headers
        axios.defaults.headers.common['Accept'] = 'application/json';

        // Subscribe net info
        this.netInfo = NetInfo.addEventListener(net_state => {
            store.dispatch(internetStatus(net_state.isInternetReachable));
            if (!net_state.isConnected) {
                Api._showError('Нет доступа к интернету');
            }
        });

        // url
        let last_symbol_url = server_url.substring(server_url.length - 1);
        this.server_url = last_symbol_url === '/' ? server_url : server_url + '/';
        this.api_url = (this.server_url.substring(-1) === '/' ?
            this.server_url : this.server_url) + 'api/' + api_version + '/';

        this._createInstance();
        this.refreshToken();
    }

    /**
     * @param phone_number
     */
    getSms(phone_number) {
        this.sms_phone_number = phone_number;
        return this.instance_api.post('get_sms', {
                app_id: app_id.toString(),
                app_secret: app_secret.toString(),
                phone_number: this.sms_phone_number.toString(),
                os: Platform.toString(),
            },
        );
    }

    /**
     * @param phone_verification_code
     */
    verifyPhoneNumber(phone_verification_code) {
        return axios.post(this.server_url + 'oauth/token', {
            grant_type: 'phone_verification_code',
            client_id: app_id,
            client_secret: app_secret,
            phone_number: this.sms_phone_number,
            verification_code: phone_verification_code,
            scope: '',
        }).then(({data}) => {
            Api._updateTokenInfo(data);
        }).catch((error) => Api.errorHandler(error));
    }

    /**
     *
     */
    static logout() {
        const api = Api.make();
        api.request('logout');
    }

    /**
     *
     */
    refreshToken() {
        let token_status = Api._checkTokenLifetime();
        if (token_status) {
            return;
        }
        if (!Api.token_info) {
            return;
        }
        let refresh_token = Api.token_info.refresh_token;
        axios.post(server_url + 'oauth/token', {
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
            client_id: app_id,
            client_secret: app_secret,
            scope: '',
        }).then(({data}) => {
            Api._updateTokenInfo(data);
        }).catch((error) => Api.errorHandler(error));
    }

    /**
     * @param token_info
     * @private
     */
    static _updateTokenInfo(token_info) {
        token_info.lifetime = new Date().getTime() / 1000 + token_info.expires_in;
        Api.token_info = token_info;
        store.dispatch(updateTokenInfo(token_info));
    }

    /**
     * @returns {boolean}
     * @private
     */
    static _checkTokenLifetime() {
        const month_seconds = 2592000;
        if (Api.token_info && 'lifetime' in Api.token_info) {
            return Api.token_info.lifetime > (new Date().getTime() / 1000 + month_seconds);
        }
        return false;
    }

    /**
     * @private
     */
    _createInstance() {
        const _this = this;
        this.instance_api = axios.create({
            baseURL: this.api_url,
            timeout: 5000,
        });

        // Add a response interceptor
        axios.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            //
            if ('response' in error && error.response !== undefined) {
                let status = 'status' in error.response ? error.response.status : '';
                if (status === 401) {
                    _this.refreshToken();
                }

            }
            Api.errorHandler(error);
            return Promise.reject(error);
        });
    }

    /**
     * @returns {*}
     */
    static make() {
        if (Api.self) {
            return Api.self;
        } else {
            Api.self = new Api(Api._singleton_key);
        }
        return Api.self;
    }

    /**
     * @param url
     * @param data
     */
    request(url, data = {}) {
        let token = Api.getToken();
        return this.instance_api.request({
            method: 'post',
            url: url,
            data: data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    }

    /**
     *
     */
    static _showError(text, status) {
        let status_text = status ? '(' + status + ')' : '';
        let error_info = text ? text : 'Ошибка сервера, попробуйте позже';
        Toast.show({
            text: error_info + status_text,
            buttonText: 'Ок',
            duration: 5000,
        });
    };


    /**
     * @param error
     */
    static errorHandler(error) {
        if (error.response) {
            Api._showError(error.response.data.message);
        } else if (error.request) {
            Api._showError('Ведутся технические работы');
        } else {
            Api._showError('Нет доступа к интернету');
        }
    }

    /**
     * @returns {string}
     * @private
     */
    static setTokenInfo(token_info) {
        Api.token_info = token_info;
    }

    /**
     * @returns {null}
     * @private
     */
    static getToken() {
        // store
        const state = store.getState();
        Api.token_info = state.token_info;
        return Api.token_info ? Api.token_info.access_token : null;
    }
}

export default Api;
