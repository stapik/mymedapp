import {createStackNavigator} from 'react-navigation-stack';
import {defaultStackConfig} from '../../settings';
import {IndexScreen, VisitCreatedModalScreen} from '../screens/Visits';

const VisitsStack = createStackNavigator({
    Index: {
        screen: IndexScreen,
        navigationOptions:{
            title:'Визиты'
        }
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
