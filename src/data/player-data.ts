import { ImageRequireSource } from 'react-native';
import * as Songs from './songs';
import * as Images from './images';
export interface Song {
   event: 'at-bat' | 'celebration';
   songFile: any;
   label: string;
   startAt: number;
}

export interface IPlayer {
   name: string;
   dob?: string;
   image?: ImageRequireSource;
   catchPhrase?: string;
   baseballIcon?: string;
   superhero?: string;
   atBatSong: Song;
   celebrationSong: Song;
}

export const PLAYERS = Object.freeze<IPlayer[]>([
   {
      name: 'James Pura',
      dob: '06-18-1984',
      image: require('./images/james.jpg'),
      catchPhrase: "Let's Rock 'n Roll",
      baseballIcon: 'Mark Langston',
      superhero: 'Deadpool',
      atBatSong: {
         event: 'at-bat',
         songFile: require('./songs/immigrant_song.mp3'),
         label: 'Immigrant Song',
         startAt: 0
      },
      celebrationSong: {
         event: 'celebration',
         songFile: require('./songs/celebrate.mp3'),
         label: 'Kool and The Gang - Celebrate',
         startAt: 33000
      }
   },
   {
      name: 'Matt Goodwin',
      dob: '10-22-1985',
      image: Images.matt,
      catchPhrase: 'Never Stop Running!',
      baseballIcon: 'Luis Ugeuto',
      superhero: 'Loki',
      atBatSong: {
         event: 'at-bat',
         songFile: Songs.f_zero_mute_city,
         label: 'F-Zero Soundtrack - Mute City',
         startAt: 15000
      },
      celebrationSong: {
         event: 'celebration',
         songFile: Songs.smw_complete_stage,
         label: 'Super Mario World: Stage Complete',
         startAt: 0
      }
   },
   {
      name: 'Jackie Tiffin',
      dob: '12-28-1987',
      image: require('./images/griff.jpg'),
      catchPhrase: 'Life is short. Play hard!',
      baseballIcon: 'Joey Cora',
      superhero: 'The Mandalorian',
      atBatSong: {
         event: 'at-bat',
         songFile: require('./songs/mando.mp3'),
         label: 'Mandalorian Theme Song',
         startAt: 70000
      },
      celebrationSong: {
         event: 'celebration',
         songFile: require('./songs/wanna_rock.mp3'),
         label: 'I Wanna Rock - Twisted Sister',
         startAt: 0
      }
   },
   {
      name: 'Alison Wendler',
      dob: '01-13-1995',
      image: require('./images/griff.jpg'),
      catchPhrase: 'Grab Some Pine, Meat!',
      baseballIcon: 'Buster Posey',
      superhero: 'Buffy the Vampire Slayer',
      atBatSong: {
         event: 'at-bat',
         songFile: require('./songs/armyofme.mp3'),
         label: 'Army of Me - Bjork',
         startAt: 0
      },
      celebrationSong: {
         event: 'celebration',
         songFile: require('./songs/superman.mp3'),
         label: 'Superman - REM',
         startAt: 16000
      }
   },
   {
      name: 'Danika Mowery',
      dob: '07-27-1992',
      image: require('./images/griff.jpg'),
      catchPhrase: 'I have sunscreen!',
      baseballIcon: 'Ichiro Suzuki',
      superhero: 'Batgirl',
      atBatSong: {
         event: 'at-bat',
         songFile: require('./songs/lefthand.mp3'),
         label: 'Left Hand Free - Alt J',
         startAt: 0
      },
      celebrationSong: {
         event: 'celebration',
         songFile: require('./songs/happy.mp3'),
         label: 'Happy - Pharrel WIlliams',
         startAt: 24000
      }
   },
   {
      name: 'Jacob Yackshaw',
      dob: '12-18-1985',
      image: require('./images/griff.jpg'),
      catchPhrase: 'The power is yours!',
      baseballIcon: 'John Olerud',
      superhero: 'Captain Planet',
      atBatSong: {
         event: 'at-bat',
         songFile: require('./songs/aatw.mp3'),
         label: 'Red Hot Chili Peppers - Around The World',
         startAt: 7000
      },
      celebrationSong: {
         event: 'celebration',
         songFile: require('./songs/celebrate.mp3'),
         label: 'Kool and The Gang - Celebrate',
         startAt: 33000
      }
   },
   {
      name: 'Jared Bigelow',
      dob: '12-24-1983',
      image: require('./images/griff.jpg'),
      catchPhrase: 'Skirrrp skirrrp',
      baseballIcon: 'Robinson Canó',
      superhero: 'Black Panther',
      atBatSong: {
         event: 'at-bat',
         songFile: require('./songs/famous.mp3'),
         label: 'Famous - Curren$y',
         startAt: 0
      },
      celebrationSong: {
         event: 'celebration',
         songFile: require('./songs/mack.mp3'),
         label: 'Mark Morrison - Return of the Mack',
         startAt: 110000
      }
   }
]);
