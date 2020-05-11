import {createStackNavigator} from 'react-navigation-stack';
import {defaultStackConfig} from '../../settings';
import {IndexScreen} from '../screens/Visits';
import {commonScreens} from './commonScreens';

const VisitsStack = createStackNavigator({
    Index: {
        screen: IndexScreen,
        navigationOptions:{
            title:'Визиты'
        }
    },
    ...commonScreens
}, defaultStackConfig);

const VisitsNav = createStackNavigator({
    Main: {
        screen: VisitsStack,
    },
}, {
    mode: 'modal',
    headerMode: 'none',
});

export {VisitsNav};
