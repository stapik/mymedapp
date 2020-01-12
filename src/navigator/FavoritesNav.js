import {createStackNavigator} from 'react-navigation-stack';
import {ModalScreen} from '../screens';
import {defaultStackConfig} from '../../settings'
import {IndexScreen} from '../screens/Favorites';

const FavoritesStack = createStackNavigator({
    Index: {
        screen: IndexScreen,
        navigationOptions:{
            title:'Избранное'
        }
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
