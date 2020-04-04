/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/components/App';
import {name as appName} from './app.json';

/**
 * TODO: disable warnings
 * @type {boolean}
 */
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
