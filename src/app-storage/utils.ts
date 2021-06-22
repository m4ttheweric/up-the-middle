import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { DefaultAppStorageValues, IAppStorage } from './types';
import { AppStorage } from './provider';

export async function getInitialStorageState(): Promise<Partial<IAppStorage>> {
   //retrieve existing state from device storage...
   let ExistingStateJSON: string = await AsyncStorage.getItem(AppStateKey);

   //parse it to json
   let ExistingState: Partial<IAppStorage> = JSON.parse(ExistingStateJSON);

   if (ExistingState == null) {
      console.log('No state found, setting up new state');
      //no state found, init new state
      ExistingState = { ...DefaultAppStorageValues };

      //save the initial state before proceeeding
      await AsyncStorage.setItem(AppStateKey, JSON.stringify(ExistingState));
   } else {
      ExistingState = await AddNewKeysToExistingState(ExistingState);
   }

   return ExistingState;
}

const AppStateKey: string = 'AppState'; //storage key for app state store

export function useAppStorageInit() {
   const { INIT } = AppStorage.useDispatch();

   const [isReady, setReady] = React.useState(false);

   async function initOnLaunch() {
      const initialStorage = await getInitialStorageState();

      await INIT(initialStorage);
      //when state changes, we want to save to device storage
      AppStorage.addCallback(global => {
         //save the state to storage on change
         AsyncStorage.setItem(AppStateKey, JSON.stringify(global)).catch(
            err => {
               console.log('Error saving state to device memory', err);
            }
         );
      });

      setReady(true);
   }

   return { initOnLaunch, isReady };
}

async function AddNewKeysToExistingState(state: Partial<IAppStorage>) {
   //this adds any new keys to an existing state that might not be there from previous installs
   let missingKeys = false;

   for (let key in DefaultAppStorageValues) {
      if (!state.hasOwnProperty(key)) {
         state[key] = DefaultAppStorageValues[key];
         missingKeys = true;
      }
   }

   if (missingKeys) {
      //if there were missing keys found and added, then save it to storage before returning state
      await AsyncStorage.setItem(AppStateKey, JSON.stringify(state));
   }
   return state;
}
