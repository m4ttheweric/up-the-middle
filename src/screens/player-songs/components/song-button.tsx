import { Ionicons } from '@expo/vector-icons';
import { Button, ButtonProps } from '@ui-kitten/components';
import React, { useMemo } from 'react';
import { useKittenTheme } from '../../../components/use-kitten-theme-wrapper';
import { Song } from '../../../data/player-data';
import { useScreenSize } from '../../../utils/hooks';
import { SongContext } from '../player-songs.screen';
import { statusFromEvent } from '../utils/status-from-event';
import { EventIcon } from './event-icon';

interface SongButtonProps extends ButtonProps {
   song: Song;
}
export const SongButton: React.FC<SongButtonProps> = ({
   children,
   song,
   ...props
}) => {
   const theme = useKittenTheme();
   const status = statusFromEvent(song?.event);
   const buttonColor = theme[`color-${status}-100`];
   const { isPlaying, currentSong } = React.useContext(SongContext);
   const amIPlaying = useMemo(
      () => currentSong?.label === song.label && isPlaying,
      [isPlaying, currentSong?.label]
   );

   const size = useScreenSize();
   const iconSize = size.isSmall ? 'medium' : 'giant';
   const iconDimension = size.isSmall ? 30 : 40;
   return (
      <Button
         {...props}
         status={status}
         style={[props.style, { width: 100 }]}
         size={iconSize}
         // accessoryRight={() => (
         //    <Ionicons
         //       name={amIPlaying ? 'ios-pause' : 'ios-play'}
         //       size={40}
         //       color={buttonColor}
         //    />
         // )}
         disabled={song.songFile == null}
         accessoryLeft={() => (
            <EventIcon
               event={song.event}
               size={iconDimension}
               colorWeight={100}
            />
         )}
      />
   );
};
