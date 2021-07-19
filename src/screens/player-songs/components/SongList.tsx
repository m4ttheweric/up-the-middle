import { Text } from '@ui-kitten/components';
import React, { useContext, useMemo } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useKittenTheme } from '../../../components/use-kitten-theme-wrapper';
import { SongContext } from '../player-songs.screen';
import { EventIcon } from './event-icon';

export const SongList: React.FC = ({ children }) => {
   const theme = useKittenTheme();
   const {
      currentSong,
      setIsPlaying,
      isPlaying,
      currentPlayer,
      setCurrentSong
   } = useContext(SongContext);

   // const hasSongs =
   //    currentPlayer?.atBatSong.songFile ||
   //    currentPlayer?.celebrationSong.songFile;

   return (
      <View
         style={{
            backgroundColor: theme['color-basic-700'],
            height: 'auto',
            paddingHorizontal: 16,
            paddingVertical: 8
         }}
      >
         {currentPlayer?.songs.map((song, i) => {
            const amIPlaying = currentSong?.songFile === song.songFile;
            return (
               <TouchableOpacity
                  key={i}
                  onPress={() => {
                     console.log('set the song');
                     setCurrentSong(song);
                  }}
               >
                  <View
                     style={{
                        marginVertical: 8,
                        flexDirection: 'row',
                        alignItems: 'center'
                     }}
                  >
                     <EventIcon
                        event={song.event}
                        size={16}
                        colorWeight={amIPlaying ? 500 : 100}
                        statusOverride={'primary'}
                     />
                     <View style={{ marginLeft: 12, marginRight: 12 }}>
                        <Text
                           status={
                              currentSong?.songFile === song.songFile
                                 ? 'success'
                                 : 'control'
                           }
                           category='s1'
                           numberOfLines={1}
                           adjustsFontSizeToFit
                        >
                           {song.label}
                        </Text>
                        <Text category='c1' status='control'>
                           {capitalizeFirstLetter(song.event)}
                        </Text>
                     </View>
                  </View>
               </TouchableOpacity>
            );
         })}
      </View>
   );
};

function capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
}
