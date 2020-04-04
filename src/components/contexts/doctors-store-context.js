import React from 'react';

const {
    Provider: DoctorsStoreProvider,
    Consumer: DoctorsStoreConsumer,
} = React.createContext();

export {
    DoctorsStoreProvider,
    DoctorsStoreConsumer,
};
