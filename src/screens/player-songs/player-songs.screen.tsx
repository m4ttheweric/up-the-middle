import { Divider, Layout, Text } from '@ui-kitten/components';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, TextStyle } from 'react-native';
import { Toolbar } from '../../components/toolbar.component';
import { useKittenTheme } from '../../components/use-kitten-theme-wrapper';
import { IPlayer, PLAYERS, Song } from '../../data/player-data';
import { PlayerCard } from './components/player-card';
import { SongPlayer } from './components/song-player';
import { SongList } from './components/SongList';
import { PlayerLink } from './components/PlayerLinkProps';
import { useCurrentPlayer } from './utils/useCurrentPlayer';

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

const DEFAULT_AT_BAT_SONG: Song = {
   event: 'at-bat',
   songFile: 'the_middle.mp3',
   label: 'Zedd, Grey - The Middle (Lyrics) ft. Maren Morris',
   startAt: 46000
};

const DEFAULT_CELEBRATION_SONG: Song = {
   event: 'celebration',
   songFile: 'celebrate.mp3',
   label: 'Kool & The Gang - Celebration',
   startAt: 33000
};

const ALTERNATE_CELEBRATION_SONG: Song = {
   event: 'celebration',
   songFile: 'song2.mp3',
   label: 'Blur - Song 2',
   startAt: 13000
};

function preProcessPlayers() {
   return PLAYERS.map(p => {
      p.songs = [];

      if (p.atBatSong.songFile) {
         p.songs = [...p.songs, p.atBatSong];
      } else {
         p.songs = [...p.songs, DEFAULT_AT_BAT_SONG];
      }

      if (p.celebrationSong.songFile) {
         p.songs = [...p.songs, p.celebrationSong];
      }
      p.songs = [
         ...p.songs,
         DEFAULT_CELEBRATION_SONG,
         ALTERNATE_CELEBRATION_SONG
      ];

      p.lastName = p.name.split(' ')[1];
      return p;
   }).sort((a, b) => a.lastName.localeCompare(b.lastName));
}
export const PlayerSongsScreen: React.FC<PlayerSongsScreenProps> = ({
   children
}) => {
   const [currentSong, setCurrentSong] = useState<Song>(null);
   const [currentPlayer, setCurrentPlayer] = useState<IPlayer>(null);
   const [isPlaying, setIsPlaying] = useState<boolean>(false);
   const sortedPlayers = useMemo(() => preProcessPlayers(), []);
   const theme = useKittenTheme();
   const headerStyle = (
      flex: TextStyle['flex'],
      textAlign: TextStyle['textAlign'] = 'center'
   ): TextStyle => ({
      flex: flex,
      textAlign: textAlign
   });
   const header = () => (
      <Layout
         level={'3'}
         style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 6
         }}
      >
         <Text style={headerStyle(1)} numberOfLines={1} adjustsFontSizeToFit>
            #
         </Text>
         <Text
            style={[headerStyle(1), { marginHorizontal: 8 }]}
            numberOfLines={1}
            adjustsFontSizeToFit
         ></Text>
         <Text
            style={[headerStyle(3, 'left')]}
            numberOfLines={1}
            adjustsFontSizeToFit
         >
            Name
         </Text>
         <Text style={headerStyle(1)} numberOfLines={1} adjustsFontSizeToFit>
            Bats/Throws
         </Text>
         <Text style={headerStyle(1)} numberOfLines={1} adjustsFontSizeToFit>
            Age
         </Text>
      </Layout>
   );
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
         <Layout
            style={{
               flex: 1,
               backgroundColor: theme['background-basic-color-1']
            }}
         >
            <Toolbar title='Player Songs' />
            {header()}
            <FlatList
               data={sortedPlayers}
               keyExtractor={item => item.name + item.dob}
               renderItem={({ item: p }) => (
                  <PlayerCard key={`${p.name}-${p.dob}`} player={p} />
               )}
               nestedScrollEnabled
            />
            <SongPlayer />
            {currentPlayer && <PlayerLink />}
            {currentPlayer && <SongList />}
         </Layout>
      </SongContext.Provider>
   );
};
