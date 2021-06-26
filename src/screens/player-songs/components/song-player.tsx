import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Button, Icon, Text } from '@ui-kitten/components';
import { Audio } from 'expo-av';
import { AVPlaybackStatusToSet } from 'expo-av/build/AV';
import { useFonts } from 'expo-font';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import { useKittenTheme } from '../../../components/use-kitten-theme-wrapper';
import { SongContext } from '../player-songs.screen';
import { statusFromEvent } from '../utils/status-from-event';
import { useCurrentPlayer } from '../utils/useCurrentPlayer';
import { EventIcon } from './event-icon';
import { PlayerImage } from './player-image';

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFF8ED';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = '... loading ...';
const BUFFERING_STRING = '...buffering...';
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2;
export const SongPlayer: React.FC<{}> = () => {
   const theme = useKittenTheme();
   const [sound, setSound] = React.useState<Audio.Sound>(null);
   const { currentSong, setIsPlaying, isPlaying } = useContext(SongContext);
   const currentPlayer = useCurrentPlayer();
   const status = statusFromEvent(currentSong?.event);

   const buttonColor = theme[`color-${status}-100`];

   const index = useRef(0);
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
      Audio.setAudioModeAsync({
         allowsRecordingIOS: false,
         staysActiveInBackground: false,
         interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
         playsInSilentModeIOS: true,
         shouldDuckAndroid: true,
         interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
      });
      return () => {
         unloadPlayback();
      };
   }, []);

   useEffect(() => {
      console.log('song changed');
      async function onSongChange() {
         if (currentSong != null) {
            if (playbackInstance.current != null) {
               const status = await playbackInstance.current.getStatusAsync();
               if (status.isLoaded && status.isPlaying) {
                  await playbackInstance.current.stopAsync();
                  setState(s => ({
                     ...s,
                     isPlaying: false,
                     playbackInstancePosition: 0
                  }));
               }
            }

            _loadNewPlaybackInstance(true);
         }
      }
      onSongChange();
   }, [currentSong]);

   async function _loadNewPlaybackInstance(playing) {
      if (playbackInstance.current != null) {
         await playbackInstance.current.unloadAsync();
         // playbackInstance.current.setOnPlaybackStatusUpdate(null);
         playbackInstance.current = null;
      }

      const initialStatus: AVPlaybackStatusToSet = {
         shouldPlay: false, //currentSong.startAt > 0 ? false : true,
         volume: state.volume,
         isMuted: state.muted,
         isLooping: state.loopingType === LOOPING_TYPE_ONE,
         positionMillis: currentSong.startAt
      };

      const { sound, status } = await Audio.Sound.createAsync(
         currentSong.songFile,
         initialStatus,
         _onPlaybackStatusUpdate
      );

      playbackInstance.current = sound;
   }

   const _onPlaybackStatusUpdate = status => {
      if (status.isLoaded) {
         setState(s => ({
            ...s,
            playbackInstancePosition: status.positionMillis,
            playbackInstanceDuration: status.durationMillis,
            shouldPlay: status.shouldPlay,
            isPlaying: status.isPlaying,
            isBuffering: status.isBuffering,
            muted: status.isMuted,
            volume: status.volume,
            loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL
         }));
      } else {
         if (status.error) {
            console.log(`FATAL PLAYER ERROR: ${status.error}`);
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

   const fadeIcon = useFadingIcon(fading);

   return (
      <View
         style={{
            width: '100%',
            backgroundColor: theme['color-basic-700'],
            padding: 20
         }}
      >
         {currentSong != null && (
            <View
               style={[
                  styles.playbackContainer,
                  {
                     opacity: state.isLoading ? DISABLED_OPACITY : 1.0
                  }
               ]}
            >
               <View style={styles.timestampRow}>
                  {/* <Text
                     status={'control'}
                     style={[
                        styles.text,
                        styles.buffering,
                        { fontFamily: 'cutive-mono-regular' }
                     ]}
                  >
                     {state.isBuffering ? BUFFERING_STRING : ''}
                  </Text> */}
                  <Text
                     status={'control'}
                     style={[
                        styles.text,
                        styles.timestamp,
                        { fontFamily: 'cutive-mono-regular' }
                     ]}
                  >
                     {_getTimestamp()}
                  </Text>
               </View>
               <View
                  style={{
                     flexDirection: 'row',
                     justifyContent: 'space-between',
                     alignSelf: 'stretch',
                     alignItems: 'center'
                  }}
               >
                  <Slider
                     style={{ flex: 1 }}
                     //trackImage={ICON_TRACK_1.module}
                     //thumbImage={ICON_THUMB_1.module}
                     minimumTrackTintColor={theme[`color-${status}-500`]}
                     maximumTrackTintColor={theme[`color-${status}-100`]}
                     value={_getSeekSliderPosition()}
                     onValueChange={_onSeekSliderValueChange}
                     onSlidingComplete={_onSeekSliderSlidingComplete}
                     disabled={state.isLoading}
                  />
                  {currentSong != null && (
                     <Button
                        onPress={fadeOut}
                        appearance={fading ? 'filled' : 'outline'}
                        status={'danger'}
                        size={'tiny'}
                        style={{
                           marginLeft: 12,
                           borderRadius: 100,
                           marginRight: 6
                        }}
                        //disabled={!state.isPlaying}
                        accessoryRight={fadeIcon}
                     />
                  )}
               </View>
            </View>
         )}
         <View
            style={{
               flexDirection: 'row',

               justifyContent: 'space-between',

               alignItems: 'center'
            }}
         >
            <CurrentSongDetail />

            <Button
               onPress={_onPlayPausePressed}
               size='tiny'
               status={status}
               style={{ borderRadius: 50, marginLeft: 12 }}
               disabled={!currentSong || fading}
               accessoryRight={() => (
                  <Ionicons
                     name={isPlaying ? 'ios-pause' : 'ios-play'}
                     size={currentSong ? 50 : 12}
                     color={buttonColor}
                  />
               )}
            />
         </View>
      </View>
   );
};

export function useFadingIcon(
   fading: boolean,
   width: number = 30,
   height: number = 30
) {
   const iconRef = useRef(null);

   useEffect(() => {
      if (fading === true) {
         iconRef.current?.startAnimation();
      } else {
         iconRef.current?.stopAnimation();
      }
   }, [fading]);

   const icon = style => (
      <Icon
         {...style}
         width={width}
         height={height}
         ref={iconRef}
         name={'arrow-down-outline'}
         animation='pulse'
      />
   );

   return icon;
}

const styles = StyleSheet.create({
   emptyContainer: {
      alignSelf: 'stretch',
      backgroundColor: BACKGROUND_COLOR
   },
   container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'stretch',
      backgroundColor: BACKGROUND_COLOR
   },
   wrapper: {},
   nameContainer: {
      height: FONT_SIZE
   },
   space: {
      height: FONT_SIZE
   },
   videoContainer: {
      height: VIDEO_CONTAINER_HEIGHT
   },
   video: {
      maxWidth: DEVICE_WIDTH
   },
   playbackContainer: {
      //flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'stretch',
      marginBottom: 28
   },
   playbackSlider: {
      alignSelf: 'stretch'
   },
   timestampRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
      minHeight: FONT_SIZE
   },
   text: {
      fontSize: FONT_SIZE,
      minHeight: FONT_SIZE
   },
   buffering: {
      textAlign: 'left',
      paddingLeft: 20
   },
   timestamp: {
      textAlign: 'right',
      paddingRight: 20
   },
   button: {
      backgroundColor: BACKGROUND_COLOR
   },
   buttonsContainerBase: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
   },

   volumeContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      minWidth: DEVICE_WIDTH / 2.0,
      maxWidth: DEVICE_WIDTH / 2.0
   },
   rateSlider: {
      width: DEVICE_WIDTH / 2.0
   },
   buttonsContainerTextRow: {
      maxHeight: FONT_SIZE,
      alignItems: 'center',
      paddingRight: 20,
      paddingLeft: 20,
      minWidth: DEVICE_WIDTH,
      maxWidth: DEVICE_WIDTH
   }
});

const CurrentSongDetail: React.FC = ({ children }) => {
   const { currentSong } = useContext(SongContext);
   const currentPlayer = useCurrentPlayer();
   const theme = useKittenTheme();
   const status = statusFromEvent(currentSong?.event);
   return (
      <View style={{ flexDirection: 'row', flex: 1 }}>
         {currentSong != null && currentPlayer && (
            <>
               <PlayerImage
                  image={currentPlayer.image}
                  borderColor={theme[`color-${status}-500`]}
               />

               <View style={{ flex: 1 }}>
                  <SongTitleTicker title={currentSong.label} />
                  <Text status='control' style={{ marginTop: 4 }}>
                     {currentPlayer.name}
                  </Text>
                  <View style={{ flexDirection: 'row', marginTop: 4 }}>
                     <EventIcon
                        event={currentSong.event}
                        size={12}
                        colorWeight={100}
                     />
                     <Text
                        status='control'
                        style={{ marginLeft: 4 }}
                        category={'c1'}
                     >
                        {currentSong.event === 'at-bat'
                           ? 'At Bat Song'
                           : 'Celebration Song'}
                     </Text>
                  </View>
               </View>
            </>
         )}

         {!currentSong && (
            <Text status={'control'} style={{ opacity: 0.5 }}>
               No song selected
            </Text>
         )}
      </View>
   );
};
interface SongTitleTickerProps {
   title: string;
}
const SongTitleTicker: React.FC<SongTitleTickerProps> = ({
   children,
   title
}) => {
   return (
      <View style={{ flexDirection: 'row' }}>
         <Ionicons
            name='ios-musical-notes'
            size={18}
            color='white'
            style={{ marginRight: 4 }}
         />
         <View style={{ flex: 1 }}>
            <TextTicker
               style={{ color: 'white', fontWeight: 'bold' }}
               duration={8000}
               loop
               bounce
               repeatSpacer={50}
               marqueeDelay={1000}
            >
               {title}
            </TextTicker>
         </View>
      </View>
   );
};
