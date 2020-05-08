import React from 'react';
import {VisitsStoreConsumer} from '../contexts';

const withVisitsStoreService = () => (Wrapped) => {
    return (props) => {
        return (
            <VisitsStoreConsumer>
                {
                    (visitsStoreService) => {
                        return (<Wrapped {...props} visitsStoreService={visitsStoreService}/>);
                    }
                }
            </VisitsStoreConsumer>
        );
    };
};

export {withVisitsStoreService};
