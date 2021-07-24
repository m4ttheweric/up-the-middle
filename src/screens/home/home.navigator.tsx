import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DynamicIcon } from '../../components/icons';
import { PlayerSongsScreen } from '../player-songs/player-songs.screen';
import { HomeTabBar } from './tab-bar.component';
import { RosterScreen } from '../roster/roster.screen';
import { createStackNavigator } from '@react-navigation/stack';

export const HomeTabs = createStackNavigator();

export const HomeNavigator = () => (
   <HomeTabs.Navigator
      //initialRouteName={0}
      screenOptions={{ headerShown: false }}
      //tabBar={props => <HomeTabBar {...props} />}
   >
      <HomeTabs.Screen
         name={'player-songs'}
         component={PlayerSongsScreen}
         //options={{ tabBarIcon: DynamicIcon('music') }}
      />
      {/* <HomeTabs.Screen
         name={'roster'}
         component={RosterScreen}
         options={{ tabBarIcon: DynamicIcon('person') }}
      /> */}
      {/* <HomeTabs.Screen
         name={'player'}
         component={ExpoAudioPlayer}
         options={{ tabBarIcon: DynamicIcon('home') }}
      /> */}
   </HomeTabs.Navigator>
);
