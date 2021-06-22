import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
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
