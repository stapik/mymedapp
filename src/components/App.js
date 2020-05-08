import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store, persistor} from '../store';
import DoctorsStoreService from '../services/DoctorsStoreService';
import SpecialtiesStoreService from '../services/SpecialtiesStoreService';
import {
    DoctorsStoreProvider,
    SpecialtiesStoreProvider,
    ApiProvider,
    ClinicsStoreProvider,
    VisitsStoreProvider,
} from './contexts';
import {PersistGate} from 'redux-persist/integration/react';
import Api from '../Api';
import {Root} from 'native-base';
import AppContainer from './AppContainer';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {PageLoader} from './uikit';
import ClinicsStoreService from '../services/ClinicsStoreService';
import VisitsStoreService from '../services/VisitsStoreService';

export default class App extends React.Component {

    /**
     *
     */
    componentDidMount(): void {
        SplashScreen.hide();
    }

    /**
     * @returns {*}
     */
    render() {
        const api = Api.make();
        const doctorsStoreService = new DoctorsStoreService();
        const specialtiesStoreService = new SpecialtiesStoreService();
        const clinicsStoreService = new ClinicsStoreService();
        const visitsStoreService = new VisitsStoreService();

        return (
            <Root>
                <Provider store={store}>
                    <ApiProvider value={api}>
                        <PersistGate loading={null} persistor={persistor}>
                            <SpecialtiesStoreProvider value={specialtiesStoreService}>
                                <VisitsStoreProvider value={visitsStoreService}>
                                    <DoctorsStoreProvider value={doctorsStoreService}>
                                        <ClinicsStoreProvider value={clinicsStoreService}>
                                            <ApplicationProvider {...eva} theme={eva.light}>
                                                <AppContainer/>
                                                <PageLoader/>
                                            </ApplicationProvider>
                                        </ClinicsStoreProvider>
                                    </DoctorsStoreProvider>
                                </VisitsStoreProvider>
                            </SpecialtiesStoreProvider>
                        </PersistGate>
                    </ApiProvider>
                </Provider>
            </Root>
        );
    }
}
