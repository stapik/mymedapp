import {ErrorModalScreen} from '../screens/Auth/ErrorModalScreen';
import {CheckSmsScreen, LoginScreen} from '../screens/Auth';
import {TabsNav} from './TabsNav';
import {createStackNavigator} from 'react-navigation-stack';

const AuthStack = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions:{
            title: '',
            headerTruncatedBackTitle: 'Назад',
        }
    },
    CheckSms: {
        screen: CheckSmsScreen,
    },
    Modal: {
        screen: ErrorModalScreen,
    },
}, {
    initialRouteName: 'Login',
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
    headerMode: 'none',
});

export {AuthNav};
