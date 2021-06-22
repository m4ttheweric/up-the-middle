import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import React, { useEffect } from 'react';
import { LogBox, Platform, StyleSheet, View, YellowBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import { Layout, Text } from '@ui-kitten/components';
import { MasterBottomBar, MasterStatusBar } from './src/components/status-bars';

import { useAppStorageInit } from './src/app-storage/utils';
import ApplicationProvider from './src/components/application-provider.component';
import { HomeNavigator } from './src/screens/home/home.navigator';
import { DimensionsProvider } from './src/components/dimensions-provider';

enableScreens();

export default function App() {
   const { isReady, initOnLaunch } = useAppStorageInit();

   useEffect(() => {
      initOnLaunch();
   }, []);

   if (!isReady) {
      return <AppLoading />;
   }

   return (
      <NavigationContainer>
         <SafeAreaProvider>
            <ApplicationProvider>
               <DimensionsProvider>
                  <MasterStatusBar />
                  <HomeNavigator />

                  <MasterBottomBar />
               </DimensionsProvider>
            </ApplicationProvider>
         </SafeAreaProvider>
      </NavigationContainer>
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
