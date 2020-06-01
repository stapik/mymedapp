import {createAppContainer} from 'react-navigation';
import React from 'react';
import {GuestNav, TabsNav} from '../navigator';
import compose from '../utils/compose';
import {connect, Provider} from 'react-redux';
import 'moment/locale/ru';
import * as moment from 'moment';
import {
    ApiProvider,
    ClinicsStoreProvider,
    DoctorsStoreProvider,
    SpecialtiesStoreProvider,
    VisitsStoreProvider,
} from './contexts';
import {Api} from './Api';
import DoctorsStoreService from '../services/DoctorsStoreService';
import SpecialtiesStoreService from '../services/SpecialtiesStoreService';
import ClinicsStoreService from '../services/ClinicsStoreService';
import VisitsStoreService from '../services/VisitsStoreService';
import {InternetStatusBar} from './uikit/InternetStatusBar';
import {PageLoader} from './uikit';

moment.locale('ru');

class AppContainerComponent extends React.Component {
    render() {
        const api = new Api();
        const doctorsStoreService = new DoctorsStoreService(api);
        const specialtiesStoreService = new SpecialtiesStoreService(api);
        const clinicsStoreService = new ClinicsStoreService(api);
        const visitsStoreService = new VisitsStoreService(api);
        const AppContainer = createAppContainer(this.props.token_info ? TabsNav : GuestNav);
        return (
            <ApiProvider value={api}>
                <SpecialtiesStoreProvider value={specialtiesStoreService}>
                    <VisitsStoreProvider value={visitsStoreService}>
                        <DoctorsStoreProvider value={doctorsStoreService}>
                            <ClinicsStoreProvider value={clinicsStoreService}>
                                <InternetStatusBar/>
                                <AppContainer/>
                                <PageLoader/>
                            </ClinicsStoreProvider>
                        </DoctorsStoreProvider>
                    </VisitsStoreProvider>
                </SpecialtiesStoreProvider>
            </ApiProvider>);
    }
}

const mapStateToProps = ({token_info}) => {
    return {token_info};
};

const mapDispatchToProps = {};

const AppContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(AppContainerComponent);

export default AppContainer;
