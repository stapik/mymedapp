import {createStackNavigator} from 'react-navigation-stack';
import {IndexScreen, SignOutModalScreen, EditProfileScreen, SupportScreen} from '../screens/Profiles';
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
    EditProfile: {
        screen: EditProfileScreen,
    },
}, defaultStackConfig);

const ProfilesNav = createStackNavigator({
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

export {ProfilesNav};
