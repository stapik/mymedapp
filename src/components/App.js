import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store, persistor} from '../store';
import {PersistGate} from 'redux-persist/integration/react';
import {Root} from 'native-base';
import AppContainer from './AppContainer';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {resetDoctorsFilter} from '../actions';

export default class App extends React.Component {

    /**
     *
     */
    componentDidMount(): void {
        SplashScreen.hide();
        store.dispatch(resetDoctorsFilter());
    }

    /**
     * @returns {*}
     */
    render() {
        return (
            <Root>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <ApplicationProvider {...eva} theme={eva.light}>
                            <AppContainer/>
                        </ApplicationProvider>
                    </PersistGate>
                </Provider>
            </Root>
        );
    }
}
