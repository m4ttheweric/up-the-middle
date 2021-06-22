import { useEffect, useState, useMemo } from 'react';
import { useScreenDimensions, IDimensions } from './hooks';

import { Dimensions } from 'react-native';

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
