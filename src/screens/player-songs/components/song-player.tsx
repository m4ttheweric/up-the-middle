import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Button, Icon } from '@ui-kitten/components';
import { Audio } from 'expo-av';
import { AVPlaybackStatus, AVPlaybackStatusToSet } from 'expo-av/build/AV';
import { useFonts } from 'expo-font';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { useKittenTheme } from '../../../components/use-kitten-theme-wrapper';
import { SongHostUrl } from '../../../data/player-data';
import { SongContext } from '../player-songs.screen';
import { statusFromEvent } from '../utils/status-from-event';
import { CurrentSongDetail } from './CurrentSongDetail';

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;
const LOADING_STRING = '... loading ...';
const BUFFERING_STRING = '...buffering...';

export const SongPlayer: React.FC<{}> = () => {
   const theme = useKittenTheme();

   const { currentSong, setIsPlaying, isPlaying } = useContext(SongContext);

   const status = statusFromEvent(currentSong?.event);

   const buttonColor = theme[`color-${status}-100`];

   const isSeeking = useRef(false);
   const shouldPlayAtEndOfSeek = useRef(false);
   const playbackInstance = useRef<Audio.Sound>(null);
   const [state, setState] = useState({
      showVideo: false,
      playbackInstanceName: LOADING_STRING,
      loopingType: LOOPING_TYPE_ALL,
      muted: false,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isBuffering: false,
      isLoading: false,
      volume: 1.0,
      fullscreen: false
   });

   const [fontLoaded] = useFonts({
      ...MaterialIcons.font,
      'cutive-mono-regular': require('../../../../assets/fonts/CutiveMono-Regular.ttf')
   });

   const unloadPlayback = async () => {
      if (playbackInstance.current != null) {
         const status = await playbackInstance.current.getStatusAsync();
         if (status.isLoaded && status.isPlaying) {
            await playbackInstance.current.stopAsync();
         }

         await playbackInstance.current.unloadAsync();
         // playbackInstance.current.setOnPlaybackStatusUpdate(null);
         playbackInstance.current = null;
      }
   };

   useEffect(() => {
      console.log('did mount');
      Audio.setAudioModeAsync({
         allowsRecordingIOS: false,
         staysActiveInBackground: false,
         interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
         playsInSilentModeIOS: true,
         shouldDuckAndroid: true,
         interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
      });
      return () => {
         console.log('did mount cleanup');
         unloadPlayback();
      };
   }, []);

   useEffect(() => {
      console.log('song changed');
      if (currentSong) {
         _loadNewPlaybackInstance(true);
      }
      return () => {
         async function cleanup() {
            if (currentSong != null) {
               if (playbackInstance.current != null) {
                  const status =
                     await playbackInstance.current.getStatusAsync();
                  if (status.isLoaded && status.isPlaying) {
                     await playbackInstance.current.stopAsync();
                     setState(s => ({
                        ...s,
                        isPlaying: false,
                        playbackInstancePosition: 0
                     }));
                  }
               }
            }
         }
         cleanup();
      };
   }, [currentSong]);

   async function _loadNewPlaybackInstance(playing) {
      if (playbackInstance.current != null) {
         await playbackInstance.current.unloadAsync();
         // playbackInstance.current.setOnPlaybackStatusUpdate(null);
         playbackInstance.current = null;
      }
      console.log('unloaded');
      const initialStatus: AVPlaybackStatusToSet = {
         shouldPlay: true, //currentSong.startAt > 0 ? false : true,
         volume: state.volume,
         isMuted: state.muted,
         isLooping: state.loopingType === LOOPING_TYPE_ONE,
         positionMillis: currentSong.startAt
      };

      const { sound, status } = await Audio.Sound.createAsync(
         { uri: SongHostUrl(currentSong.songFile) },
         initialStatus,
         _onPlaybackStatusUpdate
      );
      playbackInstance.current = sound;
   }

   const _onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
      if (status.isLoaded) {
         setState(s => ({
            ...s,
            playbackInstancePosition: status.positionMillis,
            playbackInstanceDuration: status.durationMillis,
            shouldPlay: status.shouldPlay,
            isPlaying: status.isPlaying,
            isBuffering: status.isBuffering,
            isLoading: !status.isLoaded,
            muted: status.isMuted,
            volume: status.volume,
            loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL
         }));
      } else {
         if (status?.['error']) {
            console.log(`FATAL PLAYER ERROR: ${status?.['error']}`);
         }
      }
   };

   useEffect(() => {
      if (isPlaying != state.isPlaying) {
         setIsPlaying(state.isPlaying);
      }
   }, [state.isPlaying]);

   const _onLoadStart = () => {
      console.log(`ON LOAD START`);
   };

   const _onLoad = status => {
      console.log(`ON LOAD : ${JSON.stringify(status)}`);
   };

   const _onError = error => {
      console.log(`ON ERROR : ${error}`);
   };

   const _onPlayPausePressed = () => {
      if (playbackInstance.current != null) {
         if (state.isPlaying) {
            playbackInstance.current.pauseAsync();
            //fadeOut();
         } else {
            if (currentSong.startAt > 0) {
               fadeInAndPlay();
            } else {
               playbackInstance.current.playFromPositionAsync(
                  currentSong.startAt
               );
            }
         }
      }
   };

   const _onStopPressed = () => {
      if (playbackInstance.current != null) {
         playbackInstance.current.stopAsync();
      }
   };

   const _onMutePressed = () => {
      if (playbackInstance.current != null) {
         playbackInstance.current.setIsMutedAsync(!state.muted);
      }
   };

   const _onVolumeSliderValueChange = value => {
      if (playbackInstance.current != null) {
         SetVolume(value);
      }
   };

   const _onSeekSliderValueChange = value => {
      if (playbackInstance.current != null && !isSeeking.current) {
         isSeeking.current = true;
         shouldPlayAtEndOfSeek.current = state.shouldPlay;
         playbackInstance.current.pauseAsync();
      }
   };

   const _onSeekSliderSlidingComplete = async value => {
      if (playbackInstance.current != null) {
         isSeeking.current = false;
         const seekPosition = value * state.playbackInstanceDuration;
         if (shouldPlayAtEndOfSeek.current) {
            playbackInstance.current.playFromPositionAsync(seekPosition);
         } else {
            playbackInstance.current.setPositionAsync(seekPosition);
         }
      }
   };

   function _getSeekSliderPosition() {
      if (
         playbackInstance.current != null &&
         state.playbackInstancePosition != null &&
         state.playbackInstanceDuration != null
      ) {
         return state.playbackInstancePosition / state.playbackInstanceDuration;
      }
      return 0;
   }

   function _getMMSSFromMillis(millis) {
      const totalSeconds = millis / 1000;
      const seconds = Math.floor(totalSeconds % 60);
      const minutes = Math.floor(totalSeconds / 60);

      const padWithZero = number => {
         const string = number.toString();
         if (number < 10) {
            return '0' + string;
         }
         return string;
      };
      return padWithZero(minutes) + ':' + padWithZero(seconds);
   }

   function _getTimestamp() {
      if (
         playbackInstance.current != null &&
         state.playbackInstancePosition != null &&
         state.playbackInstanceDuration != null
      ) {
         return `${_getMMSSFromMillis(
            state.playbackInstancePosition
         )} / ${_getMMSSFromMillis(state.playbackInstanceDuration)}`;
      }
      return '';
   }
   const [fading, setFading] = useState<boolean>(false);
   async function fadeOut() {
      if (playbackInstance.current != null) {
         const status = await playbackInstance.current.getStatusAsync();
         if (status.isLoaded && status.isPlaying) {
            setFading(true);
            console.log('fade out!');
            const initialVolume = status.volume;
            let vol = initialVolume;

            const reduceVol = () => {
               vol = vol - 0.01;
               SetVolume(vol);

               if (vol > 0) {
                  setTimeout(async () => {
                     if (playbackInstance.current != null) {
                        const status =
                           await playbackInstance.current.getStatusAsync();
                        if (status.isLoaded && status.isPlaying) {
                           reduceVol();
                        } else {
                           playbackInstance.current.setVolumeAsync(
                              initialVolume
                           );
                           setFading(false);
                        }
                     } else {
                        setFading(false);
                     }
                  }, 35);
               } else {
                  playbackInstance.current.stopAsync();
                  SetVolume(initialVolume);
                  setFading(false);
               }
            };

            reduceVol();
         }
      }
   }

   async function SetVolume(v: number) {
      if (playbackInstance.current != null) {
         await playbackInstance.current.setVolumeAsync(v);
      }
   }

   async function fadeInAndPlay() {
      if (playbackInstance.current != null) {
         const status = await playbackInstance.current.getStatusAsync();
         if (status.isLoaded && !status.isPlaying) {
            await SetVolume(0);

            await playbackInstance.current.playFromPositionAsync(
               currentSong.startAt
            );
            let vol = 0;
            const fadeIn = async () => {
               if (playbackInstance.current != null) {
                  const status =
                     await playbackInstance.current.getStatusAsync();
                  if (status.isLoaded && status.isPlaying) {
                     vol = vol + 0.05;
                     await SetVolume(vol);

                     if (vol < 1) {
                        setTimeout(() => {
                           fadeIn();
                        }, 50);
                     }
                  } else {
                     await SetVolume(1);
                  }
               }
            };
            fadeIn();
         }
      }
   }

   const pulseIconRef = useRef<Icon<any>>(null);

   useEffect(() => {
      if (fading === true) {
         console.log('starting animation');
         pulseIconRef.current?.startAnimation();
      } else {
         pulseIconRef.current?.stopAnimation();
      }
   }, [fading]);
   const renderPulseIcon = useMemo(
      () => props =>
         (
            <Icon
               {...props}
               height={30}
               width={30}
               ref={pulseIconRef}
               animationConfig={{ cycles: 100 }}
               animation='pulse'
               name='trending-down-outline'
            />
         ),
      []
   );
   return (
      <View
         style={{
            width: '100%',
            backgroundColor: theme[`color-basic-1000`]
         }}
      >
         {currentSong && state.isPlaying && (
            <ProgressLine position={_getSeekSliderPosition()} />
         )}
         <View
            style={{
               flexDirection: 'row',
               justifyContent: 'space-between',
               alignItems: 'center',
               paddingVertical: 12,
               paddingHorizontal: 6
            }}
         >
            <Button
               onPress={() => {
                  fadeOut();
                  //pulseIconRef.current.startAnimation();
               }}
               //appearance={fading ? 'filled' : 'outline'}
               appearance={'ghost'}
               status={fading ? 'danger' : 'control'}
               size={'tiny'}
               style={{ opacity: currentSong ? 1 : 0, marginRight: 4 }}
               disabled={!currentSong}
               accessoryRight={renderPulseIcon}
            />

            <CurrentSongDetail />

            <Button
               onPress={_onPlayPausePressed}
               size='tiny'
               appearance='ghost'
               status={'control'}
               style={{
                  borderRadius: 50,
                  marginLeft: 12,
                  opacity: currentSong ? 1 : 0
               }}
               disabled={!currentSong || fading}
               accessoryRight={() => (
                  <Ionicons
                     name={isPlaying ? 'ios-pause' : 'ios-play'}
                     size={50}
                     color={buttonColor}
                  />
               )}
            />
         </View>
      </View>
   );
};

interface ProgressLineProps {
   position: number;
}
const ProgressLine: React.FC<ProgressLineProps> = ({ children, position }) => {
   const theme = useKittenTheme();
   return (
      <View style={{ width: '100%', position: 'relative' }}>
         <View
            style={{
               width: '100%',
               height: 3,
               zIndex: 1,
               backgroundColor: 'white'
            }}
         ></View>
         <View
            style={{
               width: `${position * 100}%`,
               height: 3,
               backgroundColor: theme['color-info-500'],
               position: 'absolute',
               zIndex: 2
            }}
         ></View>
      </View>
   );
};
