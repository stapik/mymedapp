import {ErrorModalScreen} from '../screens/Auth';
import {CheckSmsScreen, LoginScreen} from '../screens/Auth';
import {createStackNavigator} from 'react-navigation-stack';
import {defaultStackConfig} from '../../settings';

const GuestNav = createStackNavigator({
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

export {GuestNav};
