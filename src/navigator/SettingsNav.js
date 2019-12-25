import {createStackNavigator} from 'react-navigation-stack';
import { DefaultScreen, ModalScreen} from '../screens';
import {defaultStackConfig} from '../../settings'

const SettingsStack = createStackNavigator({
    Index: {
        screen: DefaultScreen,
    },
}, defaultStackConfig);

const SettingsNav = createStackNavigator({
    Main: {
        screen: SettingsStack,
    },
    Modal: {
        screen: ModalScreen,
    },
}, {
    mode: 'modal',
    headerMode: 'none',
});

export {SettingsNav};
