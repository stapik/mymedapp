import {createStackNavigator} from 'react-navigation-stack';
import {ModalScreen} from '../screens';
import {defaultStackConfig} from '../../settings'
import {IndexScreen} from '../screens/Promotions';

const PromotionsStack = createStackNavigator({
    Index: {
        screen: IndexScreen,
        navigationOptions:{
            title:'Акции'
        }
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
