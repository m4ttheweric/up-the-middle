import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';

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
            <Text status='control' numberOfLines={1} adjustsFontSizeToFit>
               {title}
            </Text>
         </View>
      </View>
   );
};
