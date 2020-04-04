import React from 'react';
import {SpecialtiesStoreConsumer} from '../contexts/specialties-store-context';

const withSpecialtiesStoreService = () => (Wrapped) => {
    return (props) => {
        return (
            <SpecialtiesStoreConsumer>
                {
                    (specialtiesStoreService) => {
                        return (<Wrapped {...props} specialtiesStoreService={specialtiesStoreService}/>);
                    }
                }
            </SpecialtiesStoreConsumer>
        );
    };
};

export {withSpecialtiesStoreService};
