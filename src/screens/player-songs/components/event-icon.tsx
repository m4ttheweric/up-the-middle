import React from 'react';
import { Song } from '../../../data/player-data';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useKittenTheme } from '../../../components/use-kitten-theme-wrapper';
import { statusFromEvent } from '../utils/status-from-event';

interface EventIconProps {
   event: Song['event'];
   size: number;
   colorWeight: number;
   statusOverride?: string;
}
export const EventIcon: React.FC<EventIconProps> = ({
   children,
   event,
   size,
   colorWeight,
   statusOverride
}) => {
   const theme = useKittenTheme();
   const status = statusFromEvent(event);
   const buttonColor =
      theme[`color-${statusOverride || status}-${colorWeight}`];
   return (
      <>
         {event === 'at-bat' ? (
            <MaterialCommunityIcons
               name='baseball-bat'
               size={size}
               color={buttonColor}
            />
         ) : (
            <MaterialIcons name='celebration' size={size} color={buttonColor} />
         )}
      </>
   );
};
