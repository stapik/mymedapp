import {createStackNavigator} from 'react-navigation-stack';
import {IndexScreen, SignOutModalScreen, EditProfileModalScreen, SupportScreen} from '../screens/Profiles';
import {defaultStackConfig} from '../../settings';

const SettingsStack = createStackNavigator({
    Index: {
        screen: IndexScreen,
        navigationOptions: {
            title: 'Профиль',
        },
    },
    Support: {
        screen: SupportScreen,
        navigationOptions: {
            title: 'Поддержка',
        },
    },
}, defaultStackConfig);

const ProfilesNav = createStackNavigator({
    Main: {
        screen: SettingsStack,
    },
    SignOut: {
        screen: SignOutModalScreen,
    },
    EditProfile: {
        screen: EditProfileModalScreen,
    },
}, {
    mode: 'modal',
    headerMode: 'none',
});

export {ProfilesNav};
