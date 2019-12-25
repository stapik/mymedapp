import axios from 'axios';
import {app_id, app_secret, api_url, api_version} from './../../settings';

let prepared_url = api_url.replace('//', '/');
const baseURL = (prepared_url.substring(-1) === '/' ? prepared_url : prepared_url + '/') + api_version + '/';

export default axios.create({
    baseURL: baseURL,
    timeout: 7000
});

