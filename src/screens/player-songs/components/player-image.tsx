import { Spinner } from '@ui-kitten/components';
import React, { useMemo, useState } from 'react';
import {
   Image,
   ImageSourcePropType,
   Platform,
   StyleSheet,
   View,
   ViewProps
} from 'react-native';
import { IPlayer } from '../../../data/player-data';
import { useScreenSize } from '../../../utils/hooks';

interface PlayerImageProps extends ViewProps {
   image: IPlayer['image'];
}
export const PlayerImage: React.FC<PlayerImageProps> = ({
   image,
   ...props
}) => {
   const [loading, setLoading] = useState<boolean>(true);

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
      <View style={styles.container}>
         <Image
            onLoadEnd={() => {
               setLoading(false);
            }}
            resizeMethod='scale'
            source={ImageSource}
            style={Platform.OS === 'web' ? styles.webStyle : styles.deviceStyle}
         />
         {loading && (
            <View style={styles.spinnerContainer}>
               <Spinner status={'info'} />
            </View>
         )}
      </View>
   );
};

const useStyles = () => {
   const screenSize = useScreenSize();
   return StyleSheet.create({
      container: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
         maxHeight: Platform.OS === 'web' ? 400 : screenSize.isSmall ? 75 : 100,
         maxWidth: 85,
         minHeight: 100,
         marginHorizontal: 8,
         overflow: 'hidden'
      },
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
      },
      spinnerContainer: {
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
      }
   });
};
