import {createStackNavigator} from 'react-navigation-stack';
import {
    AppointmentFormModalScreen,
    DoctorFilterScreen,
    IndexScreen, SelectDateScreen,
    SelectSpecialtyScreen,
    SpecialtyDoctorsScreen,
} from '../screens/Appointment';
import {defaultStackConfig} from '../../settings';
import React from 'react';
import {CalendarScreen, DoctorInfoScreen} from '../screens/Common';
import {SelectClinicScreen} from '../screens/Appointment/SelectClinicScreen';

const AppointmentStack = createStackNavigator({
    Index: {
        screen: IndexScreen,
    },
    DoctorInfo: {
        screen: DoctorInfoScreen,
    },
    DoctorFilter: {
        screen: DoctorFilterScreen,
    },
    SelectSpecialty: {
        screen: SelectSpecialtyScreen,
    },
    SelectDate: {
        screen: SelectDateScreen,
    },
    SelectClinic: {
        screen: SelectClinicScreen,
    },
    SpecialtyDoctors: {
        screen: SpecialtyDoctorsScreen,
    },
    Calendar: {
        screen: CalendarScreen,
    },
}, defaultStackConfig);

const AppointmentNav = createStackNavigator({
    Main: {
        screen: AppointmentStack,
    },
    AppointmentForm: {
        screen: AppointmentFormModalScreen,
    },
}, {
    mode: 'modal',
    headerMode: 'none',
});

export {AppointmentNav};
