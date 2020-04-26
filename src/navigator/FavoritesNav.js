import {createStackNavigator} from 'react-navigation-stack';
import {ModalScreen} from '../screens';
import {defaultStackConfig} from '../../settings';
import {IndexScreen} from '../screens/Favorites';
import {AppointmentFormScreen, CalendarScreen, DoctorInfoScreen} from '../screens/Common';

const FavoritesStack = createStackNavigator({
    Index: {
        screen: IndexScreen,
        navigationOptions: {
            title: 'Избранное',
        },
    },
    DoctorInfo: {
        screen: DoctorInfoScreen,
    },
    Calendar: {
        screen: CalendarScreen,
    },
    AppointmentForm: {
        screen: AppointmentFormScreen,
    },
}, defaultStackConfig);

const FavoritesNav = createStackNavigator({
    Main: {
        screen: FavoritesStack,
    },
    Modal: {
        screen: ModalScreen,
    },
}, {
    mode: 'modal',
    headerMode: 'none',
});

export {FavoritesNav};
