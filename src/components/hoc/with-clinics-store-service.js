import React from 'react';
import {ClinicsStoreConsumer} from '../contexts';

const withClinicsStoreService = () => (Wrapped) => {
    return (props) => {
        return (
            <ClinicsStoreConsumer>
                {
                    (clinicsStoreService) => {
                        return (<Wrapped {...props} clinicsStoreService={clinicsStoreService}/>);
                    }
                }
            </ClinicsStoreConsumer>
        );
    };
};

export {withClinicsStoreService};
