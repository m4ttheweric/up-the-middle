import { createProvider } from 'reactn';
import { DefaultAppStorageValues, IAppStorage } from './types';
import { AppStorageReducerMap, AppStorageReducers } from './reducers';

export const AppStorage = createProvider<IAppStorage, AppStorageReducerMap>(
   { ...DefaultAppStorageValues },
   AppStorageReducers
);

export default AppStorage;
