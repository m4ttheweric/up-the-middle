import { StatusBar as RNStatusBar, View, Text } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKittenTheme } from './use-kitten-theme-wrapper';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

type StatusBarContextState = {
   backgroundColor: string;
   setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
   defaultColor: string;
};

export const StatusBarContext = React.createContext<StatusBarContextState>({
   backgroundColor: '',
   setBackgroundColor: () => {},
   defaultColor: ''
});
export const BottomBarContext = React.createContext<StatusBarContextState>({
   backgroundColor: '',
   setBackgroundColor: () => {},
   defaultColor: ''
});
export const StatusBarsProvider: React.FC = ({ children }) => {
   const theme = useKittenTheme();

   const DEFAULT_STATUS_BAR_COLOR = theme['color-primary-600'];
   const DEFAULT_BOTTOM_BAR_COLOR = theme['background-basic-color-1'];

   const [statusBarBackground, setStatusBarBackground] = useState(
      DEFAULT_STATUS_BAR_COLOR
   );

   const [bottomBarBackground, setBottomBarBackground] = useState(
      DEFAULT_BOTTOM_BAR_COLOR
   );

   return (
      <StatusBarContext.Provider
         value={{
            backgroundColor: statusBarBackground,
            setBackgroundColor: setStatusBarBackground,
            defaultColor: DEFAULT_STATUS_BAR_COLOR
         }}
      >
         <BottomBarContext.Provider
            value={{
               backgroundColor: bottomBarBackground,
               setBackgroundColor: setBottomBarBackground,
               defaultColor: DEFAULT_BOTTOM_BAR_COLOR
            }}
         >
            {children}
         </BottomBarContext.Provider>
      </StatusBarContext.Provider>
   );
};

export const MasterStatusBar = ({ ...props }) => {
   const insets = useSafeAreaInsets();
   const { backgroundColor } = useContext(StatusBarContext);
   return (
      <View style={[{ height: insets.top, backgroundColor }]}>
         <ExpoStatusBar
            translucent
            style={'dark'}
            backgroundColor={backgroundColor}
            {...props}
         />
      </View>
   );
};

export const MasterBottomBar = ({ ...props }) => {
   const insets = useSafeAreaInsets();
   const { backgroundColor } = useContext(BottomBarContext);
   return <View style={[{ height: insets.bottom, backgroundColor }]}></View>;
};
//use these if you need to shove a safe area view above content for modals
export const SafeAreaTopView = () => {
   const insets = useSafeAreaInsets();
   const { backgroundColor } = useContext(StatusBarContext);
   return (
      <View
         style={{
            height: insets.top,
            backgroundColor: backgroundColor
         }}
      />
   );
};
//use these if you need to shove a safe area view above content for modals
export const SafeAreaBottomView = () => {
   const insets = useSafeAreaInsets();
   const { backgroundColor } = useContext(StatusBarContext);
   return (
      <View
         style={{
            height: insets.top,
            backgroundColor: backgroundColor
         }}
      />
   );
};

//use this if you want to adjust the status bar bg color in a component.
export const StatusBarSetter: React.FC<{ backgroundColor: string }> = ({
   backgroundColor = null
}) => {
   const {
      backgroundColor: currentBackgroundColor,
      setBackgroundColor,
      defaultColor
   } = useContext(StatusBarContext);

   const shouldUpdate =
      backgroundColor != null && backgroundColor !== currentBackgroundColor;

   useEffect(() => {
      if (shouldUpdate) {
         setBackgroundColor(previous => backgroundColor);
      }

      return () => {
         if (shouldUpdate) {
            setBackgroundColor(defaultColor);
         }
      };
   }, []);

   return <></>;
};
//use this if you want to adjust the bottom bar bg color in a component:
export const BottomBarSetter: React.FC<{ backgroundColor: string }> = ({
   backgroundColor = null
}) => {
   const {
      backgroundColor: currentBackgroundColor,
      setBackgroundColor,
      defaultColor
   } = useContext(BottomBarContext);

   const shouldUpdate =
      backgroundColor != null && backgroundColor !== currentBackgroundColor;

   useEffect(() => {
      if (shouldUpdate) {
         setBackgroundColor(previous => backgroundColor);
      }

      return () => {
         if (shouldUpdate) {
            setBackgroundColor(defaultColor);
         }
      };
   }, []);

   return <></>;
};
