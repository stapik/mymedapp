import {createStackNavigator} from 'react-navigation-stack';
import {DoctorScreen, FilterModalScreen, IndexScreen, SpecialtyDoctorsScreen} from '../screens/Appointment';
import {defaultStackConfig} from '../../settings';

const AppointmentStack = createStackNavigator({
    Index: {
        screen: IndexScreen,
        navigationOptions: {
            title: 'Запись к врачу',
            headerBackTitle: 'Назад'
        },
    },
    Doctor: {
        screen: DoctorScreen,
    },
    Specialty: {
        screen: SpecialtyDoctorsScreen,
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
