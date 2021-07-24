import { Divider, Layout, Text } from '@ui-kitten/components';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { FlatList, Platform, TextStyle, View } from 'react-native';
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

export const PlayerSongsScreen: React.FC<PlayerSongsScreenProps> = ({
   children
}) => {
   const [currentSong, setCurrentSong] = useState<Song>(null);
   const [currentPlayer, setCurrentPlayer] = useState<IPlayer>(null);
   const [isPlaying, setIsPlaying] = useState<boolean>(false);
   const { players } = useContext(PlayersContext);

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
               width: '100%',
               maxHeight: Platform.OS === 'web' ? '100vh' : 'auto'
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
            <Toolbar title='Up The Middle Music' />
            {header()}
            <FlatList
               data={players}
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
