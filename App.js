import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Home, Details, Modal} from './src/screens';
import {Text, View} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

const AppNavigator = createStackNavigator({
    Home: {
        screen: Home,
    },
    Details: {
        screen: Details,
    },
}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#80a9ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
});

class AppointmentScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>AppointmentScreen!</Text>
            </View>
        );
    }
}

class VisitsScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>VisitsScreen!</Text>
            </View>
        );
    }
}

class PromotionsScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>PromotionsScreen!</Text>
            </View>
        );
    }
}

class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>SettingsScreen!</Text>
            </View>
        );
    }
}

const AppointmentsStack = createStackNavigator({
    Main: {
        screen: AppNavigator,
    },
    MyModal: {
        screen: Modal,
    },
}, {
    mode: 'modal',
    headerMode: 'none',
});

const RootTabs = createBottomTabNavigator({
    Appointments: AppointmentsStack,
    Visits: VisitsScreen,
    Promotions: PromotionsScreen,
    Settings: SettingsScreen,
}, {
    // defaultNavigationOptions: ({navigation}) => ({
    //     tabBarIcon: ({focused, horizontal, tintColor}) => {
    //         let IconComponent = Ionicons;
    //         const {routeName} = navigation.state;
    //         let iconName;
    //
    //         switch (routeName) {
    //             case 'Appointments':
    //                 iconName = 'book';
    //                 break;
    //             case 'Visits':
    //                 iconName = 'add';
    //                 break;
    //             case 'Promotions':
    //                 iconName = 'information-circle';
    //                 break;
    //             case 'Settings':
    //                 iconName = 'options';
    //                 break;
    //         }
    //
    //         // You can return any component that you like here!
    //         return <IconComponent name={iconName} size={25} color={tintColor}/>;
    //     },
    // }),
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
    },
});


const AppContainer = createAppContainer(RootTabs);

export default class App extends React.Component {

    render() {
        return <AppContainer/>;
    }
}
