import { Text } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useKittenTheme } from '../../../components/use-kitten-theme-wrapper';
import { SongContext } from '../player-songs.screen';

interface PlayerLinkProps {}
export const PlayerLink: React.FC<PlayerLinkProps> = ({ children }) => {
   const theme = useKittenTheme();
   const {
      currentSong,
      setIsPlaying,
      isPlaying,
      currentPlayer,
      setCurrentSong
   } = useContext(SongContext);
   return (
      <TouchableOpacity activeOpacity={0.5}>
         <View style={{ backgroundColor: theme['color-basic-500'] }}>
            <Text>{currentPlayer.name}'s Card</Text>
         </View>
      </TouchableOpacity>
   );
};
