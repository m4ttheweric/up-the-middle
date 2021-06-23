import React from 'react';
import { View } from 'react-native';
import { Text, Button, ButtonProps } from '@ui-kitten/components';
import { Song } from '../song-data';
import { IconTyped } from '../../../components/ui-kitten-wrappers/IconWrapper';

interface SongButtonProps extends ButtonProps {
   song: Song<any>;
}
export const SongButton: React.FC<SongButtonProps> = ({
   children,
   song,
   ...props
}) => {
   return (
      <Button
         status={song.event === 'at-bat' ? 'info' : 'primary'}
         style={{ width: '45%' }}
         {...props}
      >
         {eva => (
            <View
               style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '100%',
                  alignItems: 'center'
               }}
            >
               <IconTyped
                  name={song.event === 'at-bat' ? 'award' : 'star'}
                  status='control'
                  style={{ height: 36, width: 36 }}
               />
               <View>
                  <Text status='control' category='h6'>
                     {song.event === 'at-bat' ? 'At-Bat' : 'Celebrate!'}
                  </Text>
                  <View
                     style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                     }}
                  >
                     <IconTyped
                        name='music'
                        status='control'
                        style={{ height: 14, width: 14, marginRight: 3 }}
                     />
                     <Text
                        {...eva}
                        adjustsFontSizeToFit={true}
                        category={'c1'}
                        status={'control'}
                        style={{ fontSize: 10 }}
                     >
                        {song.label}
                     </Text>
                  </View>
               </View>
            </View>
         )}
      </Button>
   );
};
