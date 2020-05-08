import React from 'react';
import {DoctorsStoreConsumer} from '../contexts';

const withDoctorStoreService = () => (Wrapped) => {
    return (props) => {
        return (
            <DoctorsStoreConsumer>
                {
                    (doctorsStoreService) => {
                        return (<Wrapped {...props} doctorsStoreService={doctorsStoreService}/>);
                    }
                }
            </DoctorsStoreConsumer>
        );
    };
};

export {withDoctorStoreService};
