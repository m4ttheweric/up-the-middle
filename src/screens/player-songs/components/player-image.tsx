import React from 'react';
import { View, Image, ViewProps } from 'react-native';
import { IPlayer } from '../../../data/player-data';
import { useKittenTheme } from '../../../components/use-kitten-theme-wrapper';

interface PlayerImageProps extends ViewProps {
   image: IPlayer['image'];
   size?: number;
   borderColor: string;
}
export const PlayerImage: React.FC<PlayerImageProps> = ({
   children,
   image,
   size = 75,
   borderColor,
   ...props
}) => {
   return (
      <View
         style={[
            {
               borderRadius: size / 2,
               width: size,
               height: size,
               borderWidth: 3,
               borderColor: borderColor,
               padding: 0,
               marginRight: 12
            },
            props.style
         ]}
      >
         <Image
            source={image}
            style={{ height: '100%', width: '100%', borderRadius: 50 }}
         />
      </View>
   );
};
