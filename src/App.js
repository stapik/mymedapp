import {createAppContainer} from 'react-navigation';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {AuthNav} from './navigator';

const AppContainer = createAppContainer(AuthNav);

export default class App extends React.Component {

    componentDidMount(): void {
        SplashScreen.hide();
    }

    render() {
        return <AppContainer/>;
    }
}
