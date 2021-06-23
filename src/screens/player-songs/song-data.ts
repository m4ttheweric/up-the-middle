import { ImageRequireSource } from 'react-native';

export interface Song<T extends 'at-bat' | 'celebration'> {
   event: T;
   songFile: NodeRequire;
   label: string;
   startAt: number;
}

export interface IPlayer {
   name: string;
   dob?: string;
   image?: ImageRequireSource;
   catchPhrase?: string;
   atBatSong: Song<'at-bat'>;
   celebrationSong: Song<'celebration'>;
}

export const PLAYERS = Object.freeze<IPlayer[]>([
   {
      name: 'Matt',
      dob: '10-22-1085',
      image: require('../../images/matt.jpg'),
      catchPhrase: 'Never stop running!',
      atBatSong: {
         event: 'at-bat',
         songFile: require('../../songs/dnl.m4a'),
         label: "Don't Need Love",
         startAt: 10500
      },
      celebrationSong: {
         event: 'celebration',
         songFile: require('../../songs/combust.mp3'),
         label: 'Combust',
         startAt: 10500
      }
   },
   {
      name: 'Dahlia',
      dob: '06-23-1991',
      image: require('../../images/matt.jpg'),
      catchPhrase: 'Just try and move in!',
      atBatSong: {
         event: 'at-bat',
         songFile: require('../../songs/dnl.m4a'),
         label: "Don't Need Love",
         startAt: 10500
      },
      celebrationSong: {
         event: 'celebration',
         songFile: require('../../songs/combust.mp3'),
         label: 'Combust',
         startAt: 10500
      }
   },
   {
      name: 'Michael',
      dob: '02-12-1992',
      image: require('../../images/matt.jpg'),
      catchPhrase: 'I will win!',
      atBatSong: {
         event: 'at-bat',
         songFile: require('../../songs/dnl.m4a'),
         label: "Don't Need Love",
         startAt: 10500
      },
      celebrationSong: {
         event: 'celebration',
         songFile: require('../../songs/combust.mp3'),
         label: 'Combust',
         startAt: 10500
      }
   }
]);
