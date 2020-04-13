import {ErrorModalScreen} from '../screens/Auth/ErrorModalScreen';
import {CheckSmsScreen, LoginScreen} from '../screens/Auth';
import {TabsNav} from './TabsNav';
import {createStackNavigator} from 'react-navigation-stack';
import {defaultStackConfig} from '../../settings';

const AuthNav = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            title: '',
        },
    },
    CheckSms: {
        screen: CheckSmsScreen,
    },
    Modal: {
        screen: ErrorModalScreen,
    },
}, {
    initialRouteName: 'Login',
    defaultNavigationOptions: defaultStackConfig.defaultNavigationOptions,
});

// const AuthNav = createStackNavigator({
//     Main: {
//         screen: AuthStack,
//     },
//     TabsNav: {
//         screen: TabsNav,
//         navigationOptions: {
//             gesturesEnabled: false,
//         },
//     },
// }, {
//     headerMode: 'none',
// });

export {AuthNav};
