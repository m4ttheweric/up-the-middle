import { Layout } from '@ui-kitten/components';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Toolbar } from '../../components/toolbar.component';
import { IPlayer, PLAYERS, Song } from '../../data/player-data';
import { PlayerCard } from './components/player-card';
import { SongPlayer } from './components/song-player';

interface PlayerSongsScreenProps {}

export const SongContext = React.createContext<{
   currentSong: Song;
   currentPlayer: IPlayer;
   setCurrentPlayer: React.Dispatch<IPlayer>;
   setCurrentSong: React.Dispatch<Song>;
   isPlaying: boolean;
   setIsPlaying: React.Dispatch<boolean>;
}>({
   currentSong: null,
   currentPlayer: null,
   setCurrentPlayer: null,
   setCurrentSong: null,
   isPlaying: false,
   setIsPlaying: null
});
export const PlayerSongsScreen: React.FC<PlayerSongsScreenProps> = ({
   children
}) => {
   const [currentSong, setCurrentSong] = useState<Song>(null);
   const [currentPlayer, setCurrentPlayer] = useState<IPlayer>(null);
   const [isPlaying, setIsPlaying] = useState<boolean>(false);

   return (
      <SongContext.Provider
         value={{
            currentSong,
            setCurrentSong,
            currentPlayer,
            setCurrentPlayer,
            isPlaying,
            setIsPlaying
         }}
      >
         <Layout style={{ flex: 1 }}>
            <Toolbar title='Player Songs' />
            <FlatList
               data={PLAYERS}
               keyExtractor={item => item.name + item.dob}
               renderItem={({ item: p }) => (
                  <PlayerCard key={`${p.name}-${p.dob}`} player={p} />
               )}
               nestedScrollEnabled
            />
            <SongPlayer />
         </Layout>
      </SongContext.Provider>
   );
};
