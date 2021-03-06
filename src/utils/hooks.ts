import {
   NavigationProp,
   ParamListBase,
   useNavigation
} from '@react-navigation/native';
import Constants from 'expo-constants';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DimensionsContext } from '../components/dimensions-provider';
import { useLoadingIcon } from '../components/icons';
import { useKittenTheme } from '../components/use-kitten-theme-wrapper';

export function useDidUpdateEffect(fn: () => any, dependencyArray: any[]) {
   const didMountRef = useRef(false);

   useEffect(() => {
      if (didMountRef.current) fn();
      else didMountRef.current = true;
   }, dependencyArray);
}

// export function useSplitViewPaneFocused(
//    paneScreenIndex: number,
//    homeButtonScreenIndex: number
// ) {
//    const homeNavIndex = useContext(HomeNavStateIndex);
//    const navStateIndex = useNavigationState(state => state.index);
//    const [focused, setFocused] = useState<boolean>(
//       homeNavIndex === homeButtonScreenIndex &&
//          navStateIndex === paneScreenIndex
//    );

//    useEffect(() => {
//       //console.log('some nav index changed: ', homeNavIndex, navStateIndex);
//       setFocused(
//          homeNavIndex === homeButtonScreenIndex &&
//             navStateIndex === paneScreenIndex
//       );
//    }, [navStateIndex, homeNavIndex]);

//    return focused;
// }

// export function useSplitViewPaneFocusedEffect(
//    paneScreenIndex: number,
//    homeButtonScreenIndex: number,
//    effect: (focused: boolean) => void
// ) {
//    const focused = useSplitViewPaneFocused(
//       paneScreenIndex,
//       homeButtonScreenIndex
//    );

//    useEffect(() => {
//       effect(focused);
//    }, [focused]);
// }

export function useCheckControl<KeyType>(initialState: KeyType[] = []) {
   const [selected, setSelected] = useState<KeyType[]>(initialState);
   const isChecked = (key: KeyType) => selected.includes(key);
   return {
      isChecked,
      onCheckChange: (key: KeyType) => {
         if (isChecked(key)) {
            setSelected([...selected].filter(k => k !== key));
         } else {
            setSelected([...selected, key]);
         }
      },
      selected
   };
}

interface useAppStateParams {
   onResume?: () => void;
   onBackground?: () => void;
}
export function useAppState(
   { onResume = () => {}, onBackground = () => {} }: useAppStateParams = {
      onResume: () => {},
      onBackground: () => {}
   }
): AppStateStatus {
   const appStateRef = useRef(AppState.currentState);
   const [appStateStatus, setAppStateStatus] = useState<AppStateStatus>(
      appStateRef.current
   );

   useEffect(() => {
      AppState.addEventListener('change', handleAppStateChange);

      return () => {
         AppState.removeEventListener('change', handleAppStateChange);
      };
   }, []);

   const handleAppStateChange = (nextAppState: AppStateStatus) => {
      console.log('app state changed: ', nextAppState);
      if (
         appStateRef.current.match(/inactive|background/) &&
         nextAppState === 'active'
      ) {
         console.log('app returned to foreground');
         //returned from backgrounded
         onResume();
      }

      if (
         appStateRef.current === 'active' &&
         nextAppState.match(/inactive|background/)
      ) {
         console.log('app moved to background');
         //went into background. stop connection
         onBackground();
      }

      appStateRef.current = nextAppState;
      setAppStateStatus(nextAppState);
   };

   return appStateStatus;
}

export function useUpdateEffect(effect, dependencies = []) {
   const isInitialMount = useRef(true);
   useEffect(() => {
      if (isInitialMount.current) {
         isInitialMount.current = false;
      } else {
         effect();
      }
   }, dependencies);
}
export const useStatusBarHeight = (): number => {
   if (Platform.OS === 'web') return 0;
   // const [height, setHeight] = useState(Constants.statusBarHeight);
   // function onStatusBarHeightChange(h: number) {
   //    setHeight(h);
   // }
   // useEffect(() => {
   //    StatusBarHeight.addEventListener(onStatusBarHeightChange);
   //    return () => {
   //       StatusBarHeight.removeEventListener(onStatusBarHeightChange);
   //    };
   // }, []);

   // return height;
   return Constants.statusBarHeight;
};

export interface IDimensions {
   window: {
      height: number;
      width: number;
   };
   screen: {
      height: number;
      width: number;
   };
}

export const useScreenDimensions = () => {
   const { dimensions } = useContext(DimensionsContext);

   return dimensions;
};

//THIS IS A COPY OF THE FUNCTION THAT CHANGES ERROR HANDLING
export default function useNavigationSafely<
   T extends NavigationProp<ParamListBase>
>(): T {
   try {
      useNavigation();
   } catch (e) {
      console.log(e);
      return null;
   }
   const n = useNavigation();
   return n as unknown as T;
}

interface useCommonConfig {
   initialLoadingState?: boolean;
   usePortraitDimensions?: boolean;
}

export const useCommon = (
   {
      initialLoadingState = true,
      usePortraitDimensions = true
   }: useCommonConfig = {
      initialLoadingState: true,
      usePortraitDimensions: true
   }
) => {
   const [loading, setLoading] = React.useState(initialLoadingState);

   const screenSize = useScreenSize(usePortraitDimensions);
   const dimensions = useScreenDimensions();
   const theme = useKittenTheme();
   const loadingIcon = useLoadingIcon(loading);
   const navigation = useNavigationSafely();

   const edgeInsets = useSafeAreaInsets();

   return {
      loading,
      setLoading,

      screenSize,
      dimensions,
      theme,
      loadingIcon,
      navigation,

      edgeInsets
   };
};

interface IScreenSizes {
   [key: string]: ScreenSize;
}
class ScreenSize {
   readonly MIN: number;
   readonly MAX: number;

   constructor(min: number, max: number) {
      this.MIN = min;
      this.MAX = max;
   }

   is(value: number): boolean {
      return value >= this.MIN && value < this.MAX;
   }
}

export const ScreenSizes: IScreenSizes = Object.freeze({
   SMALL: new ScreenSize(0, 450),
   MEDIUM: new ScreenSize(451, 900),
   LARGE: new ScreenSize(901, 1400),
   EXTRA_LARGE: new ScreenSize(1401, 99999),
   SHORT: new ScreenSize(0, 850),
   TALL: new ScreenSize(851, 99999)
});

export const useScreenSize = (usePortraitDimensions: boolean = true) => {
   const {
      height: _height,
      width: _width,
      isLandscape
   } = useScreenDimensions();

   const width = useMemo(
      () => (usePortraitDimensions && isLandscape ? _height : _width),
      usePortraitDimensions ? [] : [_width]
   );

   const height = useMemo(
      () => (usePortraitDimensions && isLandscape ? _width : _height),
      usePortraitDimensions ? [] : [_height]
   );

   const isSmall = useMemo(
      () => ScreenSizes.SMALL.is(width),
      usePortraitDimensions ? [] : [width]
   );
   const isMedium = useMemo(
      () => ScreenSizes.MEDIUM.is(width),
      usePortraitDimensions ? [] : [width]
   );
   const isLarge = useMemo(
      () => ScreenSizes.LARGE.is(width),
      usePortraitDimensions ? [] : [width]
   );
   const isExtraLarge = useMemo(
      () => ScreenSizes.EXTRA_LARGE.is(width),
      usePortraitDimensions ? [] : [width]
   );
   const isShort = useMemo(
      () => ScreenSizes.SHORT.is(height),
      usePortraitDimensions ? [] : [height]
   );
   const isTall = useMemo(
      () => ScreenSizes.TALL.is(height),
      usePortraitDimensions ? [] : [height]
   );

   return { isSmall, isMedium, isLarge, isExtraLarge, isShort, isTall };
};
