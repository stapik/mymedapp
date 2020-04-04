import {createStackNavigator} from 'react-navigation-stack';
import {
    AppointmentFormModalScreen,
    CalendarModalScreen,
    DoctorInfoScreen,
    FilterModalScreen,
    IndexScreen,
    SpecialtyDoctorsScreen,
} from '../screens/Appointment';
import {defaultStackConfig} from '../../settings';
import React from 'react';

const AppointmentStack = createStackNavigator({
    Index: {
        screen: IndexScreen,
        navigationOptions: {
            title: 'Запись к врачу',
        },
    },
    DoctorInfo: {
        screen: DoctorInfoScreen,
    },
    SpecialtyDoctors: {
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
    CalendarModal: {
        screen: CalendarModalScreen,
    },
    AppointmentForm: {
        screen: AppointmentFormModalScreen,
    },
}, {
    mode: 'modal',
    headerMode: 'none',
});

export {AppointmentNav};
