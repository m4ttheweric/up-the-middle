import { ButtonGroup, Layout } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { View } from 'react-native';
import { useKittenTheme } from '../../../components/use-kitten-theme-wrapper';
import { IPlayer, Song } from '../../../data/player-data';
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

   const { setCurrentSong, currentSong, setCurrentPlayer } =
      useContext(SongContext);
   const status = statusFromEvent(currentSong?.event);
   function handleSongPress(song: Song) {
      if (song && song.songFile != null) {
         setCurrentSong({ ...song });
         setCurrentPlayer(player);
      }
   }
   const currentPlayer = useCurrentPlayer();
   const theme = useKittenTheme();
   const isCurrentPlayer = currentPlayer?.name === player.name;
   const backgroundColor = isCurrentPlayer
      ? theme[`color-${status}-100`]
      : theme['background-basic-color-4'];
   return (
      <Layout
         style={[
            {
               flexDirection: screenSize.isSmall ? 'column' : 'row',
               justifyContent: 'space-between',
               marginHorizontal: 12,
               marginVertical: 8,
               borderRadius: 8,
               padding: 12,
               backgroundColor: backgroundColor,
               borderColor: isCurrentPlayer
                  ? theme[`color-${status}-500`]
                  : theme['background-basic-color-4'],
               borderWidth: 2
            }
         ]}
      >
         <PlayerDetail player={player} />
         <View
            style={{
               flexDirection: 'row',
               justifyContent: screenSize.isSmall
                  ? 'space-between'
                  : 'flex-end',
               marginTop: screenSize.isSmall ? 12 : 0
            }}
         >
            <SongButton
               onPress={() => handleSongPress(player.atBatSong)}
               song={player.atBatSong}
               style={{ width: screenSize.isSmall ? '50%' : 'auto' }}
            />
            <SongButton
               onPress={() => handleSongPress(player.celebrationSong)}
               song={player.celebrationSong}
               style={{
                  width: screenSize.isSmall ? '50%' : 'auto',
                  marginLeft: screenSize.isSmall ? 0 : 12
               }}
            />
         </View>
      </Layout>
   );
};
