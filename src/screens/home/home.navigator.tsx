import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DynamicIcon } from '../../components/icons';
import { PlayerSongsScreen } from '../player-songs/player-songs.screen';
import { HomeTabBar } from './tab-bar.component';
import { SettingsScreen } from '../settings/settings.screen';
export const HomeTabs = createBottomTabNavigator();

export const HomeNavigator = () => (
   <HomeTabs.Navigator
      //initialRouteName={0}
      screenOptions={{ headerShown: false }}
      tabBar={props => <HomeTabBar {...props} />}
   >
      <HomeTabs.Screen
         name={'player-songs'}
         component={PlayerSongsScreen}
         options={{ tabBarIcon: DynamicIcon('music') }}
      />
      <HomeTabs.Screen
         name={'settings'}
         component={SettingsScreen}
         options={{ tabBarIcon: DynamicIcon('settings') }}
      />
   </HomeTabs.Navigator>
);
