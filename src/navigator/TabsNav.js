import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react';
import {defaultTabBarOptions} from '../../settings';
import {AppointmentNav, VisitsNav, PromotionsNav, ProfilesNav, FavoritesNav} from './';
import Icon from 'react-native-vector-icons/FontAwesome5';

let handleTabPress = ({navigation}) => {
    navigation.popToTop();
    navigation.navigate(navigation.state.routeName);
};

const TabsNav = createBottomTabNavigator({
        Appointment: {
            screen: AppointmentNav,
            navigationOptions: {
                title: 'Запись',
                tabBarOnPress: handleTabPress,
            },
        },
        Visits: {
            screen: VisitsNav,
            navigationOptions: {
                title: 'Визиты',
                tabBarOnPress: handleTabPress,
            },
        },
        Favorites: {
            screen: FavoritesNav,
            navigationOptions: {
                title: 'Избранное',
                tabBarOnPress: handleTabPress,
            },
        },
        // Promotions: {
        //     screen: PromotionsNav,
        //     navigationOptions: {
        //         title: 'Акции',
        //         tabBarOnPress: handleTabPress,
        //     },
        // },
        Profiles: {
            screen: ProfilesNav,
            navigationOptions: {
                title: 'Профиль',
                tabBarOnPress: handleTabPress,
            },
        },
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;

                switch (routeName) {
                    case 'Appointment':
                        iconName = 'home';
                        break;
                    case 'Visits':
                        iconName = 'book';
                        break;
                    case 'Promotions':
                        iconName = 'percent';
                        break;
                    case 'Favorites':
                        iconName = 'star';
                        break;
                    case 'Profiles':
                        iconName = 'user';
                        break;
                }

                // You can return any component that you like here!
                return <Icon name={iconName} size={22} color={tintColor} solid/>;
            },
        }),
        tabBarOptions: defaultTabBarOptions,
    });

export {TabsNav};
