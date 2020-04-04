import {createAppContainer} from 'react-navigation';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {AuthNav} from '../navigator';
import {Provider} from 'react-redux';
import {store, persistor} from '../store';
import DoctorsStoreService from '../services/DoctorsStoreService';
import SpecialtiesStoreService from '../services/SpecialtiesStoreService';
import {DoctorsStoreProvider, SpecialtiesStoreProvider} from './contexts';
import {PersistGate} from 'redux-persist/integration/react';

const AppContainer = createAppContainer(AuthNav);

export default class App extends React.Component {

    componentDidMount(): void {
        SplashScreen.hide();
    }

    render() {
        const doctorsStoreService = new DoctorsStoreService();
        const specialtiesStoreService = new SpecialtiesStoreService();
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <SpecialtiesStoreProvider value={specialtiesStoreService}>
                        <DoctorsStoreProvider value={doctorsStoreService}>
                            <AppContainer/>
                        </DoctorsStoreProvider>
                    </SpecialtiesStoreProvider>
                </PersistGate>
            </Provider>
        );
    }
}
