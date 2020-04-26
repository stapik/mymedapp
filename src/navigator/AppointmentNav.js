import {createStackNavigator} from 'react-navigation-stack';
import {
    DoctorFilterScreen,
    IndexScreen, SelectDateScreen,
    SelectSpecialtyScreen,
    SpecialtyDoctorsScreen,
} from '../screens/Appointment';
import {defaultStackConfig} from '../../settings';
import React from 'react';
import {AppointmentFormScreen, CalendarScreen, DoctorInfoScreen} from '../screens/Common';
import {SelectClinicScreen} from '../screens/Appointment/SelectClinicScreen';

const AppointmentNav = createStackNavigator({
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
    AppointmentForm: {
        screen: AppointmentFormScreen,
    },
}, defaultStackConfig);

export {AppointmentNav};
