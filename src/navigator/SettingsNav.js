import {createStackNavigator} from 'react-navigation-stack';
import {IndexScreen, SignOutModalScreen} from '../screens/Settings';
import {defaultStackConfig} from '../../settings';

const SettingsStack = createStackNavigator({
    Index: {
        screen: IndexScreen,
        navigationOptions: {
            title: 'Настройки',
        },
    },
}, defaultStackConfig);

const SettingsNav = createStackNavigator({
    Main: {
        screen: SettingsStack,
    },
    SignOut: {
        screen: SignOutModalScreen,
    },
}, {
    mode: 'modal',
    headerMode: 'none',
});

export {SettingsNav};
