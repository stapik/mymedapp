import {createStackNavigator} from 'react-navigation-stack';
import {
    DoctorsFilterScreen,
    IndexScreen, SelectDateScreen,
    SelectSpecialtyScreen,
    SpecialtyDoctorsScreen,
    SelectClinicScreen
} from '../screens/Appointment';
import {defaultStackConfig} from '../../settings';
import React from 'react';
import {commonScreens} from './commonScreens';

const AppointmentNav = createStackNavigator({
    Index: {
        screen: IndexScreen,
    },
    DoctorsFilter: {
        screen: DoctorsFilterScreen,
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
    ...commonScreens
}, defaultStackConfig);

export {AppointmentNav};
