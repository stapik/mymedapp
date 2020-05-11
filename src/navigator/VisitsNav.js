import {createStackNavigator} from 'react-navigation-stack';
import {defaultStackConfig} from '../../settings';
import {IndexScreen, VisitCreatedModalScreen} from '../screens/Visits';
import {DoctorInfoScreen} from '../screens/Common';

const VisitsStack = createStackNavigator({
    Index: {
        screen: IndexScreen,
        navigationOptions:{
            title:'Визиты'
        }
    },
    DoctorInfo: {
        screen: DoctorInfoScreen,
    },
}, defaultStackConfig);

const VisitsNav = createStackNavigator({
    Main: {
        screen: VisitsStack,
    },
    VisitCreated: {
        screen: VisitCreatedModalScreen,
    },
}, {
    mode: 'modal',
    headerMode: 'none',
});

export {VisitsNav};
