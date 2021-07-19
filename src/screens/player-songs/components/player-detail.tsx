import React from 'react';
import { View } from 'react-native';
import { Divider, Text } from '@ui-kitten/components';
import { IPlayer } from '../../../data/player-data';
import { useScreenSize } from '../../../utils/hooks';
import { PlayerImage } from './player-image';
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
      <View style={{ flexDirection: 'row' }}>
         {/* <PlayerImage
            image={player.image}
            borderColor={theme['color-basic-700']}
         /> */}
         <View>
            <Text category={'label'} style={{ fontSize: 14 }}>
               {player.name}
            </Text>
            {!!player.catchPhrase && (
               <Text style={{ fontStyle: 'italic' }}>
                  "{player.catchPhrase}"
               </Text>
            )}
            {!!player.dob && <Text>Birthday: {player.dob}</Text>}
            {!!player.superhero && <Text>Superhero: {player.superhero}</Text>}
            {/* <Text>Role Model: {player.baseballIcon}</Text> */}
         </View>
      </View>
   );
};
