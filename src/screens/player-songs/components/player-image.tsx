import React, { useMemo, useState } from 'react';
import {
   View,
   Image,
   ViewProps,
   StyleSheet,
   Platform,
   ImageSourcePropType
} from 'react-native';
import { ImageHostUrl, IPlayer } from '../../../data/player-data';
import { useKittenTheme } from '../../../components/use-kitten-theme-wrapper';
import { Spinner } from '@ui-kitten/components';
import { useScreenSize } from '../../../utils/hooks';

interface PlayerImageProps extends ViewProps {
   image: IPlayer['image'];
}
export const PlayerImage: React.FC<PlayerImageProps> = ({
   image,
   ...props
}) => {
   const [loading, setLoading] = useState<boolean>(true);
   const screenSize = useScreenSize();

   const imageSrc = (): ImageSourcePropType => {
      if (Platform.OS === 'web') {
         return {
            uri: image,
            height: 100,
            width: 100
         };
      } else {
         return {
            uri: image
         };
      }
   };

   const ImageSource = useMemo(() => imageSrc(), []);
   const styles = useStyles();
   return (
      <View
         style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            maxHeight:
               Platform.OS === 'web' ? 400 : screenSize.isSmall ? 75 : 100,
            minHeight: 100,
            marginHorizontal: 8,
            overflow: 'hidden'
         }}
      >
         <Image
            // onLoadStart={() => {
            //    setLoading(true);
            // }}
            onLoadEnd={() => {
               setLoading(false);
            }}
            resizeMethod='scale'
            source={ImageSource}
            style={Platform.OS === 'web' ? styles.webStyle : styles.deviceStyle}
         />
         {loading && (
            <View
               style={{
                  position: 'absolute',
                  zIndex: 2,
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center',

                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: 100,
                  opacity: 0.75
               }}
            >
               <Spinner status={'info'} />
            </View>
         )}
      </View>
   );
};

const useStyles = () => {
   return StyleSheet.create({
      webStyle: {
         zIndex: 1,
         maxWidth: 100
      },
      deviceStyle: {
         height: '100%',
         width: '100%',
         maxWidth: 100,
         zIndex: 1
         //position: 'relative'
      }
   });
};
