import { Divider, Layout, Text } from '@ui-kitten/components';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { FlatList, TextStyle, View } from 'react-native';
import { Toolbar } from '../../components/toolbar.component';
import { useKittenTheme } from '../../components/use-kitten-theme-wrapper';
import { IPlayer, Song } from '../../data/player-data';
import { PlayerCard } from './components/player-card';
import { SongPlayer } from './components/song-player';
import { SongList } from './components/SongList';
import { PlayerLink } from './components/PlayerLinkProps';
import { useCurrentPlayer } from './utils/useCurrentPlayer';
import { PlayersContext } from '../../../App';

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

const IRIS: Song = {
   event: 'at-bat',
   songFile: 'iris.mp3',
   label: 'Goo Goo Dolls - Iris',
   startAt: 49000
};

const BARBIE_GIRL: Song = {
   event: 'at-bat',
   songFile: 'barbie.mp3',
   label: 'Aqua - Barbie Girl',
   startAt: 49000
};

const COTTON_EYED_JOE: Song = {
   event: 'at-bat',
   songFile: 'cottonjoe.mp3',
   label: 'Rednex - Cotton Eyed Joe',
   startAt: 0
};
const FRIDAY: Song = {
   event: 'at-bat',
   songFile: 'friday.mp3',
   label: 'Rebecca Black - Friday',
   startAt: 44
};

function preProcessPlayers(PLAYERS: IPlayer[]) {
   console.log('players ==', PLAYERS);
   if (PLAYERS == null) return [];
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
      p.firstName = p.name.split(' ')[0];
      p.image = `${p.firstName.toLowerCase()}.jpg`;
      console.log(p.image);
      return p;
   }).sort((a, b) => a.lastName.localeCompare(b.lastName));
}
export const PlayerSongsScreen: React.FC<PlayerSongsScreenProps> = ({
   children
}) => {
   const [currentSong, setCurrentSong] = useState<Song>(null);
   const [currentPlayer, setCurrentPlayer] = useState<IPlayer>(null);
   const [isPlaying, setIsPlaying] = useState<boolean>(false);
   const { players } = useContext(PlayersContext);
   const sortedPlayers = useMemo(() => preProcessPlayers(players), [players]);
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
               backgroundColor: theme['background-basic-color-1'],
               margin: 'auto',
               maxWidth: 1000,
               width: '100%'
            }}
         >
            {/* <View
               style={{
                  width: '100%',
                  maxWidth: 800,
                  margin: 'auto',
                  borderLeftColor: theme['border-basic-color-5'],
                  borderRightColor: theme['border-basic-color-5'],
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  flex: 1
               }}
            > */}
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
            {/* {currentPlayer && <PlayerLink />} */}
            {currentPlayer && <SongList />}
            {/* </View> */}
         </Layout>
      </SongContext.Provider>
   );
};
