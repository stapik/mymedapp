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
import {Root} from 'native-base';
import AppContainer from './AppContainer';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {PageLoader} from './uikit';
import ClinicsStoreService from '../services/ClinicsStoreService';
import VisitsStoreService from '../services/VisitsStoreService';
import {resetDoctorsFilter} from '../actions';
import {Api} from './Api';
import {InternetStatusBar} from './uikit/InternetStatusBar';

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
        const api = new Api(store);
        const doctorsStoreService = new DoctorsStoreService(api);
        const specialtiesStoreService = new SpecialtiesStoreService(api);
        const clinicsStoreService = new ClinicsStoreService(api);
        const visitsStoreService = new VisitsStoreService(api);

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
                                                <InternetStatusBar/>
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
