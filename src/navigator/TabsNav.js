import {createBottomTabNavigator} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {defaultTabBarOptions} from '../../settings';
import {AppointmentNav, VisitsNav, PromotionsNav, SettingsNav} from './';

const TabsNav = createBottomTabNavigator({
        Appointment: {
            screen: AppointmentNav,
            navigationOptions: {
                title: 'Запись',
            },
        },
        Visits: {
            screen: VisitsNav,
            navigationOptions: {
                title: 'Визиты',
            },
        },
        Promotions: {
            screen: PromotionsNav,
            navigationOptions: {
                title: 'Акции',
            },
        },
        Settings: {
            screen: SettingsNav,
            navigationOptions: {
                title: 'Настройки',
            },
        },
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                let IconComponent = Ionicons;
                const {routeName} = navigation.state;
                let iconName;

                switch (routeName) {
                    case 'Appointment':
                        iconName = 'ios-add-circle-outline';
                        break;
                    case 'Visits':
                        iconName = 'ios-book';
                        break;
                    case 'Promotions':
                        iconName = 'ios-information-circle';
                        break;
                    case 'Settings':
                        iconName = 'ios-settings';
                        break;
                }

                // You can return any component that you like here!
                return <IconComponent name={iconName} size={25} color={tintColor}/>;
            },
        }),
        tabBarOptions: defaultTabBarOptions,
    });

export {TabsNav};
