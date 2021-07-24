import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import TextTicker from 'react-native-text-ticker';

interface SongTitleTickerProps {
   title: string;
}
export const SongTitleTicker: React.FC<SongTitleTickerProps> = ({
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
