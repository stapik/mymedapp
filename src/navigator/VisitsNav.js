import {createStackNavigator} from 'react-navigation-stack';
import {ModalScreen} from '../screens';
import {defaultStackConfig} from '../../settings';
import {IndexScreen} from '../screens/Visits';

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
    Modal: {
        screen: ModalScreen,
    },
}, {
    mode: 'modal',
    headerMode: 'none',
});

export {VisitsNav};
