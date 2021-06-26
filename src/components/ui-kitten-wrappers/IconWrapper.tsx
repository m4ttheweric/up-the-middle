import { Icon, IconProps } from '@ui-kitten/components';
import React from 'react';
import { DynamicIconNames, FinagleIconName } from '../icons';
import {
   KittenThemeColorNames,
   useKittenTheme
} from '../use-kitten-theme-wrapper';

type Statuses =
   | 'basic'
   | 'info'
   | 'primary'
   | 'success'
   | 'warning'
   | 'danger'
   | 'control';

interface IconWrapperProps extends IconProps {
   name: DynamicIconNames;
   fill?: KittenThemeColorNames;
   status?: Statuses;
}

export const UIKittenStatusToColor = (status: Statuses = 'basic') =>
   status === 'control' ? 'color-control-default' : `color-${status}-500`;

export const IconTyped: React.FC<IconWrapperProps> = props => {
   const theme = useKittenTheme();
   return (
      <Icon
         {...props}
         name={FinagleIconName(props.name)}
         fill={
            !!props?.status
               ? theme[UIKittenStatusToColor(props.status)]
               : theme[props?.fill]
         }
      />
   );
};
