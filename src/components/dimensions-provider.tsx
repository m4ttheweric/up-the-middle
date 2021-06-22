import { Layout } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Dimensions as RnDimensions, StyleSheet } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

class Dimensions {
   constructor(
      public height: number,
      public width: number,
      public insets: EdgeInsets
   ) {}

   public get isLandscape() {
      return this.width > this.height;
   }

   //for graceful fallback
   public get screen() {
      return { height: this.height, width: this.width };
   }
   public get window() {
      return { height: this.height, width: this.width };
   }
}
export const DimensionsContext = React.createContext<{
   dimensions: Dimensions;
}>({
   dimensions: null
});

export const DimensionsProvider: React.FC = props => {
   const safe = useSafeAreaInsets();
   const [dimensions, setDimensions] = useState<Dimensions>(
      () =>
         new Dimensions(
            RnDimensions.get('window').height,
            RnDimensions.get('window').width,
            safe
         )
   );

   const verticalSafe = safe.top + safe.bottom;
   const horizontalSafe = safe.left + safe.right;
   return (
      <Layout
         style={[styles.container]}
         onLayout={e => {
            setDimensions(
               new Dimensions(
                  e.nativeEvent.layout.height - verticalSafe,
                  e.nativeEvent.layout.width - horizontalSafe,
                  safe
               )
            );
         }}
      >
         <DimensionsContext.Provider value={{ dimensions: dimensions }}>
            {props.children}
         </DimensionsContext.Provider>
      </Layout>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1
   }
});
