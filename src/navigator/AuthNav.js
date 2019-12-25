import {createSwitchNavigator} from 'react-navigation';
import {ErrorModalScreen} from '../screens/Auth/ErrorModalScreen';
import {LoginScreen} from '../screens/Auth';
import {TabsNav} from './TabsNav';
import {createStackNavigator} from 'react-navigation-stack';

const AuthStack = createSwitchNavigator({
    Index: {
        screen: LoginScreen,
    },
    Modal: {
        screen: ErrorModalScreen,
    },
}, {
    initialRouteName: 'Index',
});

const AuthNav = createStackNavigator({
    Main: {
        screen: AuthStack,
    },
    TabsNav: {
        screen: TabsNav,
    },
}, {
    headerMode: 'none',
});

export {AuthNav};
