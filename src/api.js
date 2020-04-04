import axios from 'axios';
import {api_url, api_version} from '../settings';
import {store} from './store';
import {updateToken} from './actions';

const state = store.getState();
let token = state.token;

/**
 *
 */
function setDefaults() {
    const prepared_url = api_url.replace('//', '/');
    axios.defaults.baseURL = (prepared_url.substring(-1) === '/' ?
        prepared_url : prepared_url + '/') + api_version + '/';
    axios.defaults.timeout = 7000;
    axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
}

/**
 *
 */
function requestToken() {
    let t = '123';
    store.dispatch(updateToken(t));
}

/**
 * @param t
 */
function setToken(t) {
    token = t;
    axios.defaults.headers.common['Authorization'] = `Bearer ${t}`;
}

/**
 * @param url
 * @param data
 */
function request(url, data) {
    axios({
        method: 'post',
        url: url,
        data: data,
    });
}

/**
 * @returns {string}
 */
function getToken() {
    return token;
}

function checkToken() {

}

// run
setDefaults();
checkToken();

export {setToken, request, getToken};
