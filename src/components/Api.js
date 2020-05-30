import axios from 'axios';
import {api_url, app_id, app_secret} from '../../settings.json';
import {persistor, store} from '../store';
import {resetStore, updateInternetStatus, updateTokenInfo} from '../actions';
import NetInfo from '@react-native-community/netinfo';
import {Toast} from 'native-base';
import {Platform} from '../constants';
import AsyncStorage from '@react-native-community/async-storage';
import Helper from './Helper';

/**
 *
 */
class Api {

    netInfo;
    instance;
    store;
    internetStatus;

    /**
     *
     */
    constructor() {
        this._handleInternetStatus();
        this._createInstance();
    }

    /**
     * @private
     */
    _handleInternetStatus() {
        this.netInfo = NetInfo.addEventListener(net_state => {
            const internet_status = !!net_state.isInternetReachable;
            this.internetStatus = internet_status;
            store.dispatch(updateInternetStatus(internet_status));
        });
    }

    /**
     * @private
     */
    _createInstance() {
        const _this = this;
        // api url
        const apiUrl = api_url.substring(api_url.length - 1) === '/' ? api_url : api_url + '/';
        // axios instance
        this.instance = axios.create({
            baseURL: apiUrl,
            timeout: 7000,
        });
        this.instance.defaults.headers.common['Accept'] = 'application/json';
        // handle response
        this.instance.interceptors.response.use(function (response) {
            return response.data;
        }, function (error) {

            if (error.response) {

                const data = error.response.data;
                const error_title = 'error' in data ? data.error : null;
                let error_message = 'message' in data ? data.message : 'Возникла непредвиденная ошибка.';

                switch (error_title) {
                    case 'invalid_credentials':
                        error_message = 'Неверные данные';
                        break;
                }
                const response_status = error.response.status ?? -1;
                switch (response_status) {
                    case 429:
                        error_message = 'Слишком много попыток. Повторите через 10 минут.';
                        break;
                }

                if (error_message === 'Unauthenticated.') {
                    _this.logout(true);
                    error_message = 'Выход';
                }
                _this._showError(error_message);
            } else {
                _this._showError('Ошибка при подключении к серверу.');
            }
            return Promise.reject(error);
        });

        //
        this._checkToken();
    }

    /**
     *
     */
    _checkToken() {
        const {token_info} = store.getState();
        if (this._accessTokenIsOld()) {
            this._refreshAccessToken();
        }

        if (!token_info) {
            this.logout();
        }
    }

    /**
     *
     * @returns {*}
     */
    async logout(onlyStore) {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
        await persistor.purge();
        if (!this._accessTokenIsOld() && this._getAccessToken() && !onlyStore) {
            this.request('oauth/logout');
        }
        store.dispatch(resetStore());
    }

    /**
     *
     * @param phoneNumber
     * @returns {*}
     */
    sendVerificationCode(phoneNumber) {
        const clearPhoneNumber = Helper.clearNumber(phoneNumber);
        return this.request('oauth/sendVerificationCode', {
            app_id: app_id.toString(),
            app_secret: app_secret.toString(),
            phone_number: clearPhoneNumber,
            os: Platform.toString(),
        });
    }

    /**
     *
     * @param phoneNumber
     * @param verificationCode
     */
    verifyPhoneNumber(phoneNumber, verificationCode) {
        const clearPhoneNumber = Helper.clearNumber(phoneNumber);
        return this.request('oauth/token', {
            grant_type: 'phone_verification_code',
            client_id: app_id,
            client_secret: app_secret,
            phone_number: clearPhoneNumber,
            verification_code: verificationCode,
            os: Platform.toString(),
            scope: '',
        }).then((data) => {
            this._updateTokenInfo(data);
        });
    }

    /**
     * @returns {*|Promise<any>|void|Promise<void>|Promise<any>|PromiseLike<any>}
     * @private
     */
    _refreshAccessToken() {
        return this.request('oauth/token', {
            grant_type: 'refresh_token',
            refresh_token: this._getRefreshToken(),
            client_id: app_id,
            client_secret: app_secret,
            scope: '',
        }).then((data) => {
            this._updateTokenInfo(data);
        }).catch(() => {
            this.logout();
        });
    }

    /**
     * @param data
     * @private
     */
    _updateTokenInfo(data) {
        if (data) {
            data.lifetime = new Date().getTime() / 1000 + data.expires_in;
        }
        store.dispatch(updateTokenInfo(data));
    }

    /**
     * @returns {boolean}
     * @private
     */
    _accessTokenIsOld() {
        const {token_info} = store.getState();
        if (token_info && 'lifetime' in token_info) {
            return token_info.lifetime < (new Date().getTime() / 1000);
        }
        return false;
    }

    /**
     * @param url
     * @param data
     */
    request(url, data = {}) {
        let accessToken = this._getAccessToken();
        let accessTokenType = this._getAccessTokenType();
        return this.instance.request({
            method: 'post',
            url: url,
            data: data,
            headers: {
                'Authorization': `${accessTokenType} ${accessToken}`,
            },
        });
    }

    /**
     *
     */
    _showError(text, status) {
        if (!this.internetStatus) {
            return;
        }
        let status_text = status ? '(' + status + ')' : '';
        let error_info = text ? text : 'Ошибка сервера, попробуйте позже';
        Toast.show({
            text: error_info + status_text,
            buttonText: 'Ок',
            duration: 10000,
        });
    };

    /**
     * @returns {null}
     * @private
     */
    _getAccessToken() {
        // store
        const {token_info} = store.getState();
        return token_info ? token_info.access_token : null;
    }

    /**
     * @returns {null}
     * @private
     */
    _getAccessTokenType() {
        // store
        const {token_info} = store.getState();
        return token_info ? token_info.token_type : null;
    }

    /**
     * @returns {null}
     * @private
     */
    _getRefreshToken() {
        // store
        const {token_info} = store.getState();
        return token_info ? token_info.refresh_token : null;
    }
}

export {Api};
