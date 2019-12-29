import {createStackNavigator} from 'react-navigation-stack';
import {DoctorScreen, FilterModalScreen, IndexScreen} from '../screens/Appointment';
import {defaultStackConfig} from '../../settings'

const AppointmentStack = createStackNavigator({
    Index: {
        screen: IndexScreen,
        navigationOptions:{
            title:'Запись'
        }
    },
    Doctor: {
        screen: DoctorScreen,
    },
}, defaultStackConfig);

const AppointmentNav = createStackNavigator({
    Main: {
        screen: AppointmentStack,
    },
    FilterModal: {
        screen: FilterModalScreen,
    },
}, {
    mode: 'modal',
    headerMode: 'none',
});


export {AppointmentNav};
