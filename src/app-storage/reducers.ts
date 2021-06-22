import Reducer from 'reactn/types/reducer';
import { AppStorageKey, DefaultAppStorageValues } from './types';
import {
   IAppStorage,
   KEYS_THAT_ARE_NOT_CHANGED_WHEN_USER_CHANGES
} from './types';

type AppStorageReducer<PayloadType = void> = Reducer<
   IAppStorage,
   AppStorageReducerMap,
   [PayloadType]
>;

export interface AppStorageReducerMap {
   RESET: AppStorageReducer;
   INIT: AppStorageReducer<Partial<IAppStorage>>;
   UPDATE_SITE_ID: AppStorageReducer<{ siteId: IAppStorage['siteId'] }>;
   UPDATE_AUTH_TOKEN: AppStorageReducer<{
      authToken: IAppStorage['authToken'];
   }>;
   UPDATE_DEVICE_INFO: AppStorageReducer<{
      uuid: IAppStorage['uuid'];
      deviceModel: IAppStorage['deviceModel'];
   }>;
   UPDATE_USER: AppStorageReducer<IAppStorage['user']>;
   UPDATE_LAST_DESKTOP: AppStorageReducer<IAppStorage['lastDesktop']>;
   UPDATE_UI_THEME: AppStorageReducer<{ uiTheme: IAppStorage['uiTheme'] }>;
   RESET_ON_NEW_USER: AppStorageReducer;
   ON_AUTHENTICATED: AppStorageReducer<{
      user: IAppStorage['user'];
      authToken: IAppStorage['authToken'];
   }>;
}

export const AppStorageReducers: AppStorageReducerMap = {
   RESET: (s, d) => ({ ...DefaultAppStorageValues }),
   INIT: (s, d, p) => ({ ...p }),
   UPDATE_SITE_ID: (s, d, p) => ({ ...p }),
   UPDATE_AUTH_TOKEN: (s, d, p) => ({ ...p }),
   UPDATE_DEVICE_INFO: (s, d, p) => ({
      ...p
   }),
   UPDATE_USER: (s, d, p) => ({
      user: { ...p }
   }),
   ON_AUTHENTICATED: (s, d, p) => ({ user: p.user, authToken: p.authToken }),
   UPDATE_UI_THEME: (s, d, p) => ({
      ...p
   }),
   UPDATE_LAST_DESKTOP: (s, d, p) => ({ lastDesktop: { ...p } }),
   RESET_ON_NEW_USER: (s, d) => {
      return Object.keys(DefaultAppStorageValues)
         .filter(
            (k: AppStorageKey) =>
               !KEYS_THAT_ARE_NOT_CHANGED_WHEN_USER_CHANGES.includes(k)
         )
         .reduce<Partial<IAppStorage>>(
            (s, k, i) => ({ ...s, [k]: DefaultAppStorageValues[k] }),
            {}
         );
   }
};
