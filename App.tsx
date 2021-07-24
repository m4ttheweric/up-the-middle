import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import React, { useEffect, useMemo, useState } from 'react';
import { LogBox, Platform, StyleSheet, View, YellowBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import { Layout, Text } from '@ui-kitten/components';
import { MasterBottomBar, MasterStatusBar } from './src/components/status-bars';

import { useAppStorageInit } from './src/app-storage/utils';
import UIProvider from './src/components/ui-provider';
import { HomeNavigator } from './src/screens/home/home.navigator';
import { DimensionsProvider } from './src/components/dimensions-provider';
import { IPlayer } from './src/data/player-data';

enableScreens();
export const PlayersContext = React.createContext<{ players: IPlayer[] }>(null);
export default function App() {
   const { isReady, initOnLaunch } = useAppStorageInit();
   const [doneLoadingAssets, setDoneLoadingAssets] = useState<boolean>(false);
   const [players, setPlayers] = useState<IPlayer[]>(null);
   const ctxPlayers = useMemo(() => players, [players]);
   useEffect(() => {
      initOnLaunch();
      fetch('https://up-the-middle.web.app/players.json?uid=12345')
         .then(response => response.json())
         .then(data => {
            console.log(data);
            setPlayers([...data]);
         })
         .finally(() => {
            setDoneLoadingAssets(true);
         });
   }, []);

   if (!doneLoadingAssets) {
      return <AppLoading />;
   }

   return (
      <PlayersContext.Provider value={{ players: players }}>
         <NavigationContainer>
            <SafeAreaProvider>
               <UIProvider>
                  <DimensionsProvider>
                     <MasterStatusBar />
                     <HomeNavigator />
                     <MasterBottomBar />
                  </DimensionsProvider>
               </UIProvider>
            </SafeAreaProvider>
         </NavigationContainer>
      </PlayersContext.Provider>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
   }
});

// For some reason, starting from 0.61, react-native-gesture-handler throws this warning
// https://github.com/facebook/react-native/issues/26226
if (Platform.OS !== 'web') {
   LogBox.ignoreLogs(['RCTRootView cancelTouches']);
   LogBox.ignoreLogs([
      'We found non-serializable values in the navigation state'
   ]);
   LogBox.ignoreLogs([`Animated: \`useNativeDriver\` was not specified`]);
   LogBox.ignoreLogs([`Require cycle:`]);
   LogBox.ignoreLogs([
      `There was a problem sending log messages to your development environment`
   ]);
   LogBox.ignoreLogs([
      `Accessing the 'state' property of the 'route' object is not supported`
   ]);
   LogBox.ignoreAllLogs(true);
} else {
   YellowBox.ignoreWarnings(['RCTRootView cancelTouches']);
   YellowBox.ignoreWarnings([
      'We found non-serializable values in the navigation state'
   ]);
   YellowBox.ignoreWarnings([
      `Animated: \`useNativeDriver\` was not specified`
   ]);
   YellowBox.ignoreWarnings([`Require cycle:`]);
   YellowBox.ignoreWarnings([
      `Accessing the 'state' property of the 'route' object is not supported.`
   ]);
}
