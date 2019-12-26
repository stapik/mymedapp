import {createSwitchNavigator} from 'react-navigation';
import {ErrorModalScreen} from '../screens/Auth/ErrorModalScreen';
import {LoginScreen} from '../screens/Auth';
import {TabsNav} from './TabsNav';
import {createStackNavigator} from 'react-navigation-stack';

const AuthStack = createSwitchNavigator({
    Login: {
        screen: LoginScreen,
    },
    Modal: {
        screen: ErrorModalScreen,
    },
}, {
    initialRouteName: 'Login'
});

const AuthNav = createStackNavigator({
    Main: {
        screen: AuthStack,
    },
    TabsNav: {
        screen: TabsNav,
        navigationOptions: {
            gesturesEnabled: false,
        },
    },
}, {
    headerMode: 'none'
});

export {AuthNav};
