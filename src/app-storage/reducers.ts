import Reducer from 'reactn/types/reducer';
import { AppStorageKey, DefaultAppStorageValues } from './types';
import { IAppStorage } from './types';

type AppStorageReducer<PayloadType = void> = Reducer<
   IAppStorage,
   AppStorageReducerMap,
   [PayloadType]
>;

export interface AppStorageReducerMap {
   RESET: AppStorageReducer;
   INIT: AppStorageReducer<Partial<IAppStorage>>;

   UPDATE_UI_THEME: AppStorageReducer<{ uiTheme: IAppStorage['uiTheme'] }>;
}

export const AppStorageReducers: AppStorageReducerMap = {
   RESET: (s, d) => ({ ...DefaultAppStorageValues }),
   INIT: (s, d, p) => ({ ...p }),
   UPDATE_UI_THEME: (s, d, p) => ({
      ...p
   })
};
