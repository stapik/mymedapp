import axios from 'axios';
import {api_version, app_id, app_secret, server_url} from '../settings';
import {store} from './store';
import {internetStatus, updateToken} from './actions';
import {Platform} from './constants';
import NetInfo from '@react-native-community/netinfo';
import {Toast} from 'native-base';

/**
 *
 */
class Api {

    token_info;
    netInfo;
    instance_api;
    api_url;
    server_url;
    sms_phone_number;
    static self;
    static _singleton_key = '1ksgjopa390ksfdfs3r32y3w45u';

    /**
     * @param singleton
     */
    constructor(singleton) {
        if (singleton !== Api._singleton_key) {
            throw new Error('Api class is singleton');
        }

        // store
        const state = store.getState();
        this.token_info = state.token_info;

        // default headers
        axios.defaults.headers.common['Accept'] = 'application/json';

        // Subscribe net info
        this.netInfo = NetInfo.addEventListener(state => {
            store.dispatch(internetStatus(state.isInternetReachable));
            if (!state.isConnected) {
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
            this._updateTokenInfo(data);
        });
    }

    /**
     *
     */
    logout() {
        let token = this._getToken();
        axios.post({
            url: server_url + 'oauth/logout',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    }

    /**
     *
     */
    refreshToken() {
        let token_status = this._checkTokenLifetime();
        if (token_status) {
            return;
        }
        if (!this.token_info) {
            return;
        }
        let refresh_token = this.token_info.refresh_token;
        axios.post(server_url + 'oauth/token', {
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
            client_id: app_id,
            client_secret: app_secret,
            scope: '',
        }).then((token_info) => {
            this._updateTokenInfo(token_info);
        });
    }

    /**
     * @param token_info
     * @private
     */
    _updateTokenInfo(token_info) {
        token_info.lifetime = new Date().getTime() / 1000 + token_info.expires_in;
        this.token_info = token_info;
        store.dispatch(updateToken(token_info));
    }

    /**
     * @returns {boolean}
     * @private
     */
    _checkTokenLifetime() {
        const month_seconds = 2592000;
        if (this.token_info && 'lifetime' in this.token_info) {
            return this.token_info.lifetime > (new Date().getTime() / 1000 + month_seconds);
        }
        return false;
    }

    /**
     *
     */
    _createInstance() {
        this.instance_api = axios.create({
            baseURL: this.api_url,
            timeout: 3000,
        });

        // Add a response interceptor
        axios.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            //
            if ('response' in error && error.response !== undefined) {
                let status = 'status' in error.response ? error.response.status : '';
                if (status === 401) {
                    return;
                }

            }

            Api._showError('Ошибка при обработке запроса');

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
     * @param uri
     * @param data
     */
    request(uri, data = {}) {
        let token = this._getToken();
        this.instance_api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return this.instance_api.post(uri, data);
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
            duration: 10000,
        });
    };

    _getToken(){
        return this.token_info ?  this.token_info.access_token : '';
    }
}

export default Api;
