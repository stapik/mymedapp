import {createStore, applyMiddleware} from 'redux';
import ThunkMiddleware from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import reducer from './reducers';
import {stringMiddleware} from './storeMiddleware';

const persistConfig = {
    key: 'app_state',
    storage: AsyncStorage,
    throttle: 1000,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer, applyMiddleware(ThunkMiddleware, stringMiddleware));
export const persistor = persistStore(store);
