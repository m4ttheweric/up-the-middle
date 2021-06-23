import React, { useRef, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import { Layout, Button, Card } from '@ui-kitten/components';
import { Toolbar } from '../../components/toolbar.component';
import { Audio } from 'expo-av';
import { DynamicIcon } from '../../components/icons';
import { PLAYERS } from './song-data';
import { Player } from './components/player';
import { useKittenTheme } from '../../components/use-kitten-theme-wrapper';
import { Ionicons } from '@expo/vector-icons';
interface PlayerSongsScreenProps {}
export const PlayerSongsScreen: React.FC<PlayerSongsScreenProps> = ({
   children
}) => {
   useEffect(() => {
      console.log('welcome to songs!');
   }, []);

   return (
      <Layout style={{ flex: 1 }}>
         <Toolbar title='Songs' />
         <FlatList
            data={PLAYERS}
            renderItem={({ item: p }) => (
               <Player key={`${p.name}-${p.dob}`} player={p} />
            )}
            nestedScrollEnabled
         />
         <SongPlayer />
      </Layout>
   );
};

const SongPlayer: React.FC<{}> = () => {
   const theme = useKittenTheme();
   const [sound, setSound] = React.useState<Audio.Sound>(null);

   async function handlePlayButton() {
      if (sound == null) {
         loadSound();
         return;
      }

      const status = await sound.getStatusAsync();
      if (status?.isLoaded) {
         if (status.isPlaying) {
            sound.pauseAsync();
         } else {
            sound.playAsync();
         }
      } else {
         loadSound();
      }
   }

   async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(
         require('../../songs/dnl.m4a')
      );
      setSound(sound);

      console.log('Playing Sound');
      await sound.playAsync();
   }
   // async function playSound() {
   //    console.log('Loading Sound');
   //    const { sound } = await Audio.Sound.createAsync(
   //       require('../../songs/dnl.m4a')
   //    );
   //    setSound(sound);

   //    console.log('Playing Sound');
   //    await sound.playAsync();
   // }

   React.useEffect(() => {
      return sound
         ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync();
           }
         : undefined;
   }, [sound]);

   return (
      <View
         style={{
            width: '100%',
            backgroundColor: theme['color-basic-700'],
            padding: 20
         }}
      >
         <View
            style={{
               flexDirection: 'row',
               alignSelf: 'center',
               justifyContent: 'space-between',

               alignItems: 'center'
            }}
         >
            <Button
               onPress={handlePlayButton}
               size='giant'
               status='info'
               style={{ borderRadius: 50, height: 75, width: 75 }}
            >
               {v => <Ionicons name='ios-play' size={36} color='white' />}
            </Button>
         </View>
      </View>
   );
};
