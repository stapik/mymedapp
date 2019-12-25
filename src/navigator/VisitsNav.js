import {createStackNavigator} from 'react-navigation-stack';
import {DefaultScreen, ModalScreen} from '../screens';
import {defaultStackConfig} from '../../settings';

const VisitsStack = createStackNavigator({
    Index: {
        screen: DefaultScreen,
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
