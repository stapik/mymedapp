import {createStackNavigator} from 'react-navigation-stack';
import {DetailsScreen, IndexScreen} from '../screens/Appointment';
import {ModalScreen} from '../screens';
import {defaultStackConfig} from '../../settings'

const AppointmentStack = createStackNavigator({
    Index: {
        screen: IndexScreen,
        navigationOptions:{
            title:'Запись'
        }
    },
    Details: {
        screen: DetailsScreen,
    },
}, defaultStackConfig);

const AppointmentNav = createStackNavigator({
    Main: {
        screen: AppointmentStack,
    },
    Modal: {
        screen: ModalScreen,
    },
}, {
    mode: 'modal',
    headerMode: 'none',
});


export {AppointmentNav};
