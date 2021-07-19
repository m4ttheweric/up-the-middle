import { Ionicons } from '@expo/vector-icons';
import { Text } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { View } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import { useKittenTheme } from '../../../components/use-kitten-theme-wrapper';
import { SongContext } from '../player-songs.screen';
import { statusFromEvent } from '../utils/status-from-event';
import { EventIcon } from './event-icon';

export const CurrentSongDetail: React.FC = ({ children }) => {
   const { currentSong } = useContext(SongContext);

   const theme = useKittenTheme();
   const status = statusFromEvent(currentSong?.event);
   return (
      <View style={{ flexDirection: 'row', flex: 1 }}>
         {currentSong && (
            <>
               {/* <PlayerImage
                       image={currentPlayer.image}
                       borderColor={theme[`color-${status}-500`]}
                    /> */}

               <View style={{ flex: 1 }}>
                  <SongTitleTicker title={currentSong.label} />
                  {/* <Text status='control' style={{ marginTop: 4 }}>
                       {currentPlayer.name}
                    </Text> */}
                  <View style={{ flexDirection: 'row', marginTop: 4 }}>
                     <EventIcon
                        event={currentSong.event}
                        size={12}
                        colorWeight={100}
                     />

                     <Text
                        status='control'
                        style={{ marginLeft: 4 }}
                        category={'c1'}
                     >
                        {currentSong?.event === 'at-bat'
                           ? 'At Bat Song'
                           : 'Celebration Song'}
                     </Text>
                  </View>
               </View>
            </>
         )}

         {!currentSong && (
            <Text status={'control'} style={{ opacity: 0.5 }}>
               No Song Selected
            </Text>
         )}
      </View>
   );
};
interface SongTitleTickerProps {
   title: string;
}
const SongTitleTicker: React.FC<SongTitleTickerProps> = ({
   children,
   title
}) => {
   return (
      <View style={{ flexDirection: 'row' }}>
         <Ionicons
            name='ios-musical-notes'
            size={18}
            color='white'
            style={{ marginRight: 4 }}
         />
         <View style={{ flex: 1 }}>
            <TextTicker
               style={{ color: 'white', fontWeight: 'bold' }}
               duration={8000}
               loop
               bounce
               repeatSpacer={50}
               marqueeDelay={1000}
            >
               {title}
            </TextTicker>
         </View>
      </View>
   );
};
