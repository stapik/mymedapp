/**
 * @format
 */

import {AppRegistry, YellowBox} from 'react-native';
import App from './src/components/App';
import {name as appName} from './app.json';

/**
 * TODO: disable warnings
 * @type {boolean}
 */

YellowBox.ignoreWarnings([
    'Calling `getNode()` on the ref of an Animated component is no longer necessary. You can now directly use the ref instead.',
]);

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

AppRegistry.registerComponent(appName, () => App);
