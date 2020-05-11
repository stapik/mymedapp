import {createStackNavigator} from 'react-navigation-stack';
import {ModalScreen} from '../screens';
import {defaultStackConfig} from '../../settings';
import {IndexScreen} from '../screens/Favorites';
import {commonScreens} from './commonScreens';

const FavoritesStack = createStackNavigator({
    Index: {
        screen: IndexScreen,
        navigationOptions: {
            title: 'Избранное',
        },
    },
    ...commonScreens
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
