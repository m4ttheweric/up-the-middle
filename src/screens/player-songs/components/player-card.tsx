import { ButtonGroup, Layout, Text } from '@ui-kitten/components';
import moment from 'moment';
import React, { useContext } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { useKittenTheme } from '../../../components/use-kitten-theme-wrapper';
import { ImageHostUrl, IPlayer, Song } from '../../../data/player-data';
import { useScreenSize } from '../../../utils/hooks';
import { SongContext } from '../player-songs.screen';
import { statusFromEvent } from '../utils/status-from-event';
import { useCurrentPlayer } from '../utils/useCurrentPlayer';
import { PlayerDetail } from './player-detail';
import { SongButton } from './song-button';

interface PlayerCardProps {
   player: IPlayer;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ children, player }) => {
   const screenSize = useScreenSize();

   const { setCurrentSong, currentSong, setCurrentPlayer, currentPlayer } =
      useContext(SongContext);
   const status = statusFromEvent(currentSong?.event);
   function handleSongPress(song: Song) {
      if (song && song.songFile != null) {
         setCurrentSong({ ...song });
         setCurrentPlayer(player);
      }
   }

   const theme = useKittenTheme();
   const isCurrentPlayer = currentPlayer?.name === player.name;
   const backgroundColor = isCurrentPlayer ? theme['color-basic-500'] : null;
   return (
      <TouchableOpacity
         activeOpacity={0.5}
         onPress={() => {
            console.log('setPlayer:', player.name, setCurrentPlayer);
            setCurrentPlayer(player);
         }}
      >
         <Layout
            style={[
               {
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'nowrap',
                  justifyContent: 'space-between',
                  backgroundColor: backgroundColor,
                  borderColor: theme['color-basic-400'],
                  borderBottomWidth: 1,
                  width: '100%'
               }
            ]}
         >
            <Text style={{ flex: 1, textAlign: 'center' }}>
               {player.jerseyNumber}
            </Text>
            <View
               style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  maxHeight: screenSize.isSmall ? 60 : 100,
                  marginHorizontal: 8
               }}
            >
               <Image
                  resizeMethod='auto'
                  source={{ uri: ImageHostUrl(player.image || 'griff.jpg') }}
                  style={{ height: '100%', width: '100%', maxWidth: 100 }}
               />
            </View>

            <View style={{ flex: 3 }}>
               <Text>{player.name}</Text>
               <Text>{player.position}</Text>
            </View>
            <Text style={{ flex: 1, textAlign: 'center' }}>
               {player.batsThrows}
            </Text>
            <Text style={{ flex: 1, textAlign: 'center' }}>
               {moment().diff(moment(player.dob, 'MM-DD-YYYY'), 'years')}
            </Text>
         </Layout>
      </TouchableOpacity>
   );
};
