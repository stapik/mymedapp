import {createStackNavigator} from 'react-navigation-stack';
import {DefaultScreen, ModalScreen} from '../screens';
import {defaultStackConfig} from '../../settings'

const PromotionsStack = createStackNavigator({
    Index: {
        screen: DefaultScreen,
    },
}, defaultStackConfig);

const PromotionsNav = createStackNavigator({
    Main: {
        screen: PromotionsStack,
    },
    Modal: {
        screen: ModalScreen,
    },
}, {
    mode: 'modal',
    headerMode: 'none',
});

export {PromotionsNav};
