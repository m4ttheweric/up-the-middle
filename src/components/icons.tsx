import { Icon, IconElement } from '@ui-kitten/components';
import React, { useEffect, useRef } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export const FinagleIconName = (name: DynamicIconNames) =>
   name.endsWith('-filled')
      ? name.replace('-filled', '')
      : name.endsWith('-outline')
      ? name
      : `${name}-outline`;

export const DynamicIcon =
   (
      name: DynamicIconNames,
      width: number = 25,
      height: number = 25,
      style?: StyleProp<ViewStyle>
   ) =>
   eva => {
      if (!name) {
         return null;
      }
      return (
         <Icon
            {...eva}
            width={width}
            height={height}
            style={[eva.style, style]}
            name={FinagleIconName(name)}
         />
      );
   };

export function useLoadingIcon(
   loading: boolean,
   width: number = 25,
   height: number = 25
) {
   const iconRef = useRef(null);

   useEffect(() => {
      if (loading === true) {
         iconRef.current?.startAnimation();
      } else {
         iconRef.current?.stopAnimation();
      }
   }, [loading]);

   const loadingIcon = style => (
      <Icon
         {...style}
         width={width}
         height={height}
         ref={iconRef}
         name='loader-outline'
         animation='pulse'
      />
   );

   return loadingIcon;
}

export const BackIcon = (style): IconElement => (
   <Icon {...style} name='arrow-ios-back-outline' />
);

export const LayoutIcon = (style): IconElement => (
   <Icon {...style} name='layout-outline' />
);

export const PersonIcon = (style): IconElement => (
   <Icon {...style} name='person-outline' />
);

export const MoreVerticalIcon = (style): IconElement => (
   <Icon {...style} name='more-vertical' />
);

export const LogoutIcon = (style): IconElement => (
   <Icon {...style} name='log-out-outline' />
);

export const InfoIcon = (style): IconElement => (
   <Icon {...style} name='info-outline' />
);

export const AlertTriangleIcon = (style): IconElement => (
   <Icon {...style} name='alert-triangle-outline' />
);

export const EyeIcon = (style): IconElement => (
   <Icon {...style} name='eye-outline' />
);

export const EyeOffIcon = (style): IconElement => (
   <Icon {...style} name='eye-off-outline' />
);

export const MenuIcon = (style): IconElement => (
   <Icon {...style} name='menu-outline' />
);

export const HomeIcon = (style): IconElement => (
   <Icon {...style} name='home-outline' />
);

export const DoneIcon = (style): IconElement => (
   <Icon {...style} name='checkmark-outline' />
);

export const DoneAllIcon = (style): IconElement => (
   <Icon {...style} name='done-all-outline' />
);

export const GridIcon = (style): IconElement => (
   <Icon {...style} name='grid-outline' />
);

export const SearchIcon = (style): IconElement => (
   <Icon {...style} name='search-outline' />
);

export const PlusIcon = (style): IconElement => (
   <Icon {...style} name='plus-outline' />
);

export type DynamicIconNames =
   | 'activity-filled'
   | 'activity'
   | 'alert-circle-filled'
   | 'alert-circle'
   | 'alert-triangle-filled'
   | 'alert-triangle'
   | 'archive-filled'
   | 'archive'
   | 'arrow-back-filled'
   | 'arrow-back'
   | 'arrow-circle-down-filled'
   | 'arrow-circle-down'
   | 'arrow-circle-left-filled'
   | 'arrow-circle-left'
   | 'arrow-circle-right-filled'
   | 'arrow-circle-right'
   | 'arrow-circle-up-filled'
   | 'arrow-circle-up'
   | 'arrow-down-filled'
   | 'arrow-down'
   | 'arrow-downward-filled'
   | 'arrow-downward'
   | 'arrow-forward-filled'
   | 'arrow-forward'
   | 'arrow-ios-back-filled'
   | 'arrow-ios-back'
   | 'arrow-ios-downward-filled'
   | 'arrow-ios-downward'
   | 'arrow-ios-forward-filled'
   | 'arrow-ios-forward'
   | 'arrow-ios-upward-filled'
   | 'arrow-ios-upward'
   | 'arrow-left-filled'
   | 'arrow-left'
   | 'arrow-right-filled'
   | 'arrow-right'
   | 'arrow-up-filled'
   | 'arrow-up'
   | 'arrow-upward-filled'
   | 'arrow-upward'
   | 'arrowhead-down-filled'
   | 'arrowhead-down'
   | 'arrowhead-left-filled'
   | 'arrowhead-left'
   | 'arrowhead-right-filled'
   | 'arrowhead-right'
   | 'arrowhead-up-filled'
   | 'arrowhead-up'
   | 'at-filled'
   | 'at'
   | 'attach-2-filled'
   | 'attach-2'
   | 'attach-filled'
   | 'attach'
   | 'award-filled'
   | 'award'
   | 'backspace-filled'
   | 'backspace'
   | 'bar-chart-2-filled'
   | 'bar-chart-2'
   | 'bar-chart-filled'
   | 'bar-chart'
   | 'battery-filled'
   | 'battery'
   | 'behance-filled'
   | 'behance'
   | 'bell-off-filled'
   | 'bell-off'
   | 'bell-filled'
   | 'bell'
   | 'bluetooth-filled'
   | 'bluetooth'
   | 'book-open-filled'
   | 'book-open'
   | 'book-filled'
   | 'book'
   | 'bookmark-filled'
   | 'bookmark'
   | 'briefcase-filled'
   | 'briefcase'
   | 'browser-filled'
   | 'browser'
   | 'brush-filled'
   | 'brush'
   | 'bulb-filled'
   | 'bulb'
   | 'calendar-filled'
   | 'calendar'
   | 'camera-filled'
   | 'camera'
   | 'car-filled'
   | 'car'
   | 'cast-filled'
   | 'cast'
   | 'charging-filled'
   | 'charging'
   | 'checkmark-circle-2-filled'
   | 'checkmark-circle-2'
   | 'checkmark-circle-filled'
   | 'checkmark-circle'
   | 'checkmark-square-2-filled'
   | 'checkmark-square-2'
   | 'checkmark-square-filled'
   | 'checkmark-square'
   | 'checkmark-filled'
   | 'checkmark'
   | 'chevron-down-filled'
   | 'chevron-down'
   | 'chevron-left-filled'
   | 'chevron-left'
   | 'chevron-right-filled'
   | 'chevron-right'
   | 'chevron-up-filled'
   | 'chevron-up'
   | 'clipboard-filled'
   | 'clipboard'
   | 'clock-filled'
   | 'clock'
   | 'close-circle-filled'
   | 'close-circle'
   | 'close-square-filled'
   | 'close-square'
   | 'close-filled'
   | 'close'
   | 'cloud-download-filled'
   | 'cloud-download'
   | 'cloud-upload-filled'
   | 'cloud-upload'
   | 'code-download-filled'
   | 'code-download'
   | 'code-filled'
   | 'code'
   | 'collapse-filled'
   | 'collapse'
   | 'color-palette-filled'
   | 'color-palette'
   | 'color-picker-filled'
   | 'color-picker'
   | 'compass-filled'
   | 'compass'
   | 'copy-filled'
   | 'copy'
   | 'corner-down-left-filled'
   | 'corner-down-left'
   | 'corner-down-right-filled'
   | 'corner-down-right'
   | 'corner-left-down-filled'
   | 'corner-left-down'
   | 'corner-left-up-filled'
   | 'corner-left-up'
   | 'corner-right-down-filled'
   | 'corner-right-down'
   | 'corner-right-up-filled'
   | 'corner-right-up'
   | 'corner-up-left-filled'
   | 'corner-up-left'
   | 'corner-up-right-filled'
   | 'corner-up-right'
   | 'credit-card-filled'
   | 'credit-card'
   | 'crop-filled'
   | 'crop'
   | 'cube-filled'
   | 'cube'
   | 'diagonal-arrow-left-down-filled'
   | 'diagonal-arrow-left-down'
   | 'diagonal-arrow-left-up-filled'
   | 'diagonal-arrow-left-up'
   | 'diagonal-arrow-right-down-filled'
   | 'diagonal-arrow-right-down'
   | 'diagonal-arrow-right-up-filled'
   | 'diagonal-arrow-right-up'
   | 'done-all-filled'
   | 'done-all'
   | 'download-filled'
   | 'download'
   | 'droplet-off-filled'
   | 'droplet-off'
   | 'droplet-filled'
   | 'droplet'
   | 'edit-2-filled'
   | 'edit-2'
   | 'edit-filled'
   | 'edit'
   | 'email-filled'
   | 'email'
   | 'expand-filled'
   | 'expand'
   | 'external-link-filled'
   | 'external-link'
   | 'eye-off-2-filled'
   | 'eye-off-2'
   | 'eye-off-filled'
   | 'eye-off'
   | 'eye-filled'
   | 'eye'
   | 'facebook-filled'
   | 'facebook'
   | 'file-add-filled'
   | 'file-add'
   | 'file-remove-filled'
   | 'file-remove'
   | 'file-text-filled'
   | 'file-text'
   | 'file-filled'
   | 'file'
   | 'film-filled'
   | 'film'
   | 'flag-filled'
   | 'flag'
   | 'flash-off-filled'
   | 'flash-off'
   | 'flash-filled'
   | 'flash'
   | 'flip-2-filled'
   | 'flip-2'
   | 'flip-filled'
   | 'flip'
   | 'folder-add-filled'
   | 'folder-add'
   | 'folder-remove-filled'
   | 'folder-remove'
   | 'folder-filled'
   | 'folder'
   | 'funnel-filled'
   | 'funnel'
   | 'gift-filled'
   | 'gift'
   | 'github-filled'
   | 'github'
   | 'globe-2-filled'
   | 'globe-2'
   | 'globe-3-filled'
   | 'globe-3'
   | 'globe-filled'
   | 'globe'
   | 'google-filled'
   | 'google'
   | 'grid-filled'
   | 'grid'
   | 'hard-drive-filled'
   | 'hard-drive'
   | 'hash-filled'
   | 'hash'
   | 'headphones-filled'
   | 'headphones'
   | 'heart-filled'
   | 'heart'
   | 'home-filled'
   | 'home'
   | 'image-2-filled'
   | 'image-2'
   | 'image-filled'
   | 'image'
   | 'inbox-filled'
   | 'inbox'
   | 'info-filled'
   | 'info'
   | 'keypad-filled'
   | 'keypad'
   | 'layers-filled'
   | 'layers'
   | 'layout-filled'
   | 'layout'
   | 'link-2-filled'
   | 'link-2'
   | 'link-filled'
   | 'link'
   | 'linkedin-filled'
   | 'linkedin'
   | 'list-filled'
   | 'list'
   | 'lock-filled'
   | 'lock'
   | 'log-in-filled'
   | 'log-in'
   | 'log-out-filled'
   | 'log-out'
   | 'map-filled'
   | 'map'
   | 'maximize-filled'
   | 'maximize'
   | 'menu-2-filled'
   | 'menu-2'
   | 'menu-arrow-filled'
   | 'menu-arrow'
   | 'menu-filled'
   | 'menu'
   | 'message-circle-filled'
   | 'message-circle'
   | 'message-square-filled'
   | 'message-square'
   | 'mic-off-filled'
   | 'mic-off'
   | 'mic-filled'
   | 'mic'
   | 'minimize-filled'
   | 'minimize'
   | 'minus-circle-filled'
   | 'minus-circle'
   | 'minus-square-filled'
   | 'minus-square'
   | 'minus-filled'
   | 'minus'
   | 'monitor-filled'
   | 'monitor'
   | 'moon-filled'
   | 'moon'
   | 'more-horizontal-filled'
   | 'more-horizontal'
   | 'more-vertical-filled'
   | 'more-vertical'
   | 'move-filled'
   | 'move'
   | 'music-filled'
   | 'music'
   | 'navigation-2-filled'
   | 'navigation-2'
   | 'navigation-filled'
   | 'navigation'
   | 'npm-filled'
   | 'npm'
   | 'options-2-filled'
   | 'options-2'
   | 'options-filled'
   | 'options'
   | 'pantone-filled'
   | 'pantone'
   | 'paper-plane-filled'
   | 'paper-plane'
   | 'pause-circle-filled'
   | 'pause-circle'
   | 'people-filled'
   | 'people'
   | 'percent-filled'
   | 'percent'
   | 'person-add-filled'
   | 'person-add'
   | 'person-delete-filled'
   | 'person-delete'
   | 'person-done-filled'
   | 'person-done'
   | 'person-remove-filled'
   | 'person-remove'
   | 'person-filled'
   | 'person'
   | 'phone-call-filled'
   | 'phone-call'
   | 'phone-missed-filled'
   | 'phone-missed'
   | 'phone-off-filled'
   | 'phone-off'
   | 'phone-filled'
   | 'phone'
   | 'pie-chart-2-filled'
   | 'pie-chart-2'
   | 'pie-chart-filled'
   | 'pie-chart'
   | 'pin-filled'
   | 'pin'
   | 'play-circle-filled'
   | 'play-circle'
   | 'plus-circle-filled'
   | 'plus-circle'
   | 'plus-square-filled'
   | 'plus-square'
   | 'plus-filled'
   | 'plus'
   | 'power-filled'
   | 'power'
   | 'pricetags-filled'
   | 'pricetags'
   | 'printer-filled'
   | 'printer'
   | 'question-mark-circle-filled'
   | 'question-mark-circle'
   | 'question-mark-filled'
   | 'question-mark'
   | 'radio-button-off-filled'
   | 'radio-button-off'
   | 'radio-button-on-filled'
   | 'radio-button-on'
   | 'radio-filled'
   | 'radio'
   | 'recording-filled'
   | 'recording'
   | 'refresh-filled'
   | 'refresh'
   | 'repeat-filled'
   | 'repeat'
   | 'rewind-left-filled'
   | 'rewind-left'
   | 'rewind-right-filled'
   | 'rewind-right'
   | 'save-filled'
   | 'save'
   | 'scissors-filled'
   | 'scissors'
   | 'search-filled'
   | 'search'
   | 'settings-2-filled'
   | 'settings-2'
   | 'settings-filled'
   | 'settings'
   | 'shake-filled'
   | 'shake'
   | 'share-filled'
   | 'share'
   | 'shield-off-filled'
   | 'shield-off'
   | 'shield-filled'
   | 'shield'
   | 'shopping-bag-filled'
   | 'shopping-bag'
   | 'shopping-cart-filled'
   | 'shopping-cart'
   | 'shuffle-2-filled'
   | 'shuffle-2'
   | 'shuffle-filled'
   | 'shuffle'
   | 'skip-back-filled'
   | 'skip-back'
   | 'skip-forward-filled'
   | 'skip-forward'
   | 'slash-filled'
   | 'slash'
   | 'smartphone-filled'
   | 'smartphone'
   | 'smiling-face-filled'
   | 'smiling-face'
   | 'speaker-filled'
   | 'speaker'
   | 'square-filled'
   | 'square'
   | 'star-filled'
   | 'star'
   | 'stop-circle-filled'
   | 'stop-circle'
   | 'sun-filled'
   | 'sun'
   | 'swap-filled'
   | 'swap'
   | 'sync-filled'
   | 'sync'
   | 'text-filled'
   | 'text'
   | 'thermometer-minus-filled'
   | 'thermometer-minus'
   | 'thermometer-plus-filled'
   | 'thermometer-plus'
   | 'thermometer-filled'
   | 'thermometer'
   | 'toggle-left-filled'
   | 'toggle-left'
   | 'toggle-right-filled'
   | 'toggle-right'
   | 'trash-2-filled'
   | 'trash-2'
   | 'trash-filled'
   | 'trash'
   | 'trending-down-filled'
   | 'trending-down'
   | 'trending-up-filled'
   | 'trending-up'
   | 'tv-filled'
   | 'tv'
   | 'twitter-filled'
   | 'twitter'
   | 'umbrella-filled'
   | 'umbrella'
   | 'undo-filled'
   | 'undo'
   | 'unlock-filled'
   | 'unlock'
   | 'upload-filled'
   | 'upload'
   | 'video-off-filled'
   | 'video-off'
   | 'video-filled'
   | 'video'
   | 'volume-down-filled'
   | 'volume-down'
   | 'volume-mute-filled'
   | 'volume-mute'
   | 'volume-off-filled'
   | 'volume-off'
   | 'volume-up-filled'
   | 'volume-up'
   | 'wifi-off-filled'
   | 'wifi-off'
   | 'wifi-filled'
   | 'wifi';
