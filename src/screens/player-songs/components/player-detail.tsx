import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@ui-kitten/components';
import { IPlayer } from '../song-data';
import { useKittenTheme } from '../../../components/use-kitten-theme-wrapper';

interface PlayerDetailProps {
   player: IPlayer;
}
export const PlayerDetail: React.FC<PlayerDetailProps> = ({
   children,
   player
}) => {
   const theme = useKittenTheme();
   return (
      <View style={{ flexDirection: 'row', padding: 12 }}>
         <View
            style={{
               borderRadius: 50,
               width: 75,
               height: 75,
               borderWidth: 3,
               borderColor: theme['color-info-500'],
               padding: 0
            }}
         >
            <Image
               source={player.image}
               style={{ height: '100%', width: '100%', borderRadius: 50 }}
            />
         </View>
         <View>
            <Text>{player.name}</Text>
            <Text>{player.dob}</Text>
            <Text style={{ fontStyle: 'italic' }}>"{player.catchPhrase}"</Text>
            <Text>{player.dob}</Text>
         </View>
      </View>
   );
};
