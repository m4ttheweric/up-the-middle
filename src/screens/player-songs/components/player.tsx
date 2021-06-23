import React from 'react';
import { View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { IPlayer } from '../song-data';
import { SongButton } from './song-button';
import { PlayerDetail } from './player-detail';

interface PlayerProps {
   player: IPlayer;
}
export const Player: React.FC<PlayerProps> = ({ children, player }) => {
   return (
      <Layout level='2'>
         <PlayerDetail player={player} />
         <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <SongButton song={player.atBatSong} />
            <SongButton song={player.celebrationSong} />
         </View>
      </Layout>
   );
};
