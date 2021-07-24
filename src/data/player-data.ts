import uuid from '../utils/uuid';

export interface Song {
   event: 'at-bat' | 'celebration';
   songFile: any;
   label: string;
   startAt: number;
}

export interface IPlayer {
   name: string;
   firstName?: string;
   lastName?: string;
   dob?: string;
   image?: string;
   catchPhrase?: string;
   baseballIcon?: string;
   superhero?: string;
   position?:
      | '1B'
      | '2B'
      | '3B'
      | 'SS'
      | 'C'
      | 'CI'
      | 'MI'
      | 'IF'
      | 'LF'
      | 'CF'
      | 'RF'
      | 'OF'
      | 'Util'
      | 'P';
   batsThrows: 'R/R' | 'L/L' | 'S/R' | 'S/L';
   jerseyNumber: number;
   atBatSong: Song;
   celebrationSong: Song;
   songs?: Song[];
}
export const SongHostUrl = (file: string) =>
   `https://up-the-middle.web.app/songs/${file}`;
export const ImageHostUrl = (file: string) =>
   `https://up-the-middle.web.app/images/${file}?u=3`;

// export const PLAYERS = Object.freeze<IPlayer[]>([
//    {
//       name: 'James Pura',
//       dob: '06-18-1984',
//       image: 'james.jpg',
//       catchPhrase: "Let's Rock 'n Roll",
//       baseballIcon: 'Mark Langston',
//       superhero: 'Deadpool',
//       position: 'CF',
//       batsThrows: 'R/R',
//       jerseyNumber: 12,
//       atBatSong: {
//          event: 'at-bat',
//          songFile: 'immigrant_song.mp3',
//          label: 'Immigrant Song',
//          startAt: 2000
//       },
//       celebrationSong: {
//          event: 'celebration',
//          songFile: 'sandman.mp3',
//          label: 'Metallica - Enter Sandman ',
//          startAt: 56000
//       }
//    },
//    {
//       name: 'Matt Goodwin',
//       dob: '10-22-1985',
//       image: 'matt.jpg',
//       catchPhrase: 'Never stop running!',
//       baseballIcon: 'Luis Ugeuto',
//       superhero: 'Loki',
//       position: 'LF',
//       batsThrows: 'R/R',
//       jerseyNumber: 22,
//       atBatSong: {
//          event: 'at-bat',
//          songFile: 'bigblue.mp3',
//          label: 'F-Zero: Big Blue',
//          startAt: 10000
//       },
//       celebrationSong: {
//          event: 'celebration',
//          songFile: 'smw_complete.mp3',
//          label: 'Super Mario World: Stage Complete',
//          startAt: 0
//       }
//    },
//    {
//       name: 'Jackie Tiffin',
//       dob: '12-28-1987',
//       image: 'jackie.jpg',
//       catchPhrase: 'Life is short. Play hard!',
//       baseballIcon: 'Joey Cora',
//       superhero: 'The Mandalorian',
//       position: '2B',
//       batsThrows: 'R/R',
//       jerseyNumber: 28,
//       atBatSong: {
//          event: 'at-bat',
//          songFile: 'mando.mp3',
//          label: 'Mandalorian Theme Song',
//          startAt: 70000
//       },
//       celebrationSong: {
//          event: 'celebration',
//          songFile: 'wanna_rock.mp3',
//          label: 'I Wanna Rock - Twisted Sister',
//          startAt: 0
//       }
//    },
//    {
//       name: 'Alison Wendler',
//       dob: '01-13-1995',
//       image: 'alison.jpg',
//       catchPhrase: 'Grab Some Pine, Meat!',
//       baseballIcon: 'Buster Posey',
//       superhero: 'Buffy the Vampire Slayer',
//       position: 'Util',
//       batsThrows: 'R/R',
//       jerseyNumber: 29,
//       atBatSong: {
//          event: 'at-bat',
//          songFile: 'armyofme.mp3',
//          label: 'Army of Me - Bjork',
//          startAt: 0
//       },
//       celebrationSong: {
//          event: 'celebration',
//          songFile: 'superman.mp3',
//          label: 'Superman - REM',
//          startAt: 16000
//       }
//    },
//    {
//       name: 'Danika Mowery',
//       dob: '07-27-1992',
//       image: 'danika.jpg',
//       catchPhrase: 'I have sunscreen!',
//       baseballIcon: 'Ichiro Suzuki',
//       superhero: 'Batgirl',
//       position: 'C',
//       batsThrows: 'R/R',
//       jerseyNumber: 51,
//       atBatSong: {
//          event: 'at-bat',
//          songFile: 'lefthand.mp3',
//          label: 'Left Hand Free - Alt J',
//          startAt: 0
//       },
//       celebrationSong: {
//          event: 'celebration',
//          songFile: 'happy.mp3',
//          label: 'Happy - Pharrel WIlliams',
//          startAt: 24000
//       }
//    },
//    {
//       name: 'Jacob Yackshaw',
//       dob: '12-18-1985',
//       image: 'jacob.jpg',
//       catchPhrase: 'The power is yours!',
//       baseballIcon: 'John Olerud',
//       superhero: 'Captain Planet',
//       position: 'CI',
//       batsThrows: 'L/L',
//       jerseyNumber: 5,
//       atBatSong: {
//          event: 'at-bat',
//          songFile: 'aatw.mp3',
//          label: 'Red Hot Chili Peppers - Around The World',
//          startAt: 7000
//       },
//       celebrationSong: {
//          event: 'celebration',
//          songFile: '',
//          label: '',
//          startAt: 0
//       }
//    },
//    {
//       name: 'Jared Bigelow',
//       dob: '12-24-1983',
//       image: 'jared.jpg',
//       catchPhrase: 'Skirrrp skirrrp',
//       baseballIcon: 'Robinson Canó',
//       superhero: 'Black Panther',
//       position: 'IF',
//       batsThrows: 'R/R',
//       jerseyNumber: 14,
//       atBatSong: {
//          event: 'at-bat',
//          songFile: 'famous.mp3',
//          label: 'Famous - Curren$y',
//          startAt: 0
//       },
//       celebrationSong: {
//          event: 'celebration',
//          songFile: 'mack.mp3',
//          label: 'Mark Morrison - Return of the Mack',
//          startAt: 110000
//       }
//    },
//    {
//       name: 'Noah Anderson',
//       dob: '09-05-1989',
//       image: 'noah.jpg',
//       catchPhrase: "There's always next year.",
//       baseballIcon: 'Dan Wilson',
//       superhero: 'Superman',
//       position: 'SS',
//       batsThrows: 'R/R',
//       jerseyNumber: 6,
//       atBatSong: {
//          event: 'at-bat',
//          songFile: 'howdoilive.mp3',
//          label: 'Leann Rimes - How Do I Live ',
//          startAt: 55000
//       },
//       celebrationSong: {
//          event: 'celebration',
//          songFile: '',
//          label: '',
//          startAt: 0
//       }
//    },
//    {
//       name: 'Kate Johnson',
//       dob: '10-20-1984',
//       image: 'kate.jpg',
//       catchPhrase: 'Bring it on',
//       baseballIcon: 'Ken Griffey Jr.',
//       superhero: 'Scarlet Witch',
//       position: 'IF',
//       batsThrows: 'L/L',
//       jerseyNumber: 24,
//       atBatSong: {
//          event: 'at-bat',
//          songFile: 'flower.mp3',
//          label: 'Flower - Moby',
//          startAt: 0
//       },
//       celebrationSong: {
//          event: 'celebration',
//          songFile: '',
//          label: '',
//          startAt: 0
//       }
//    },
//    {
//       name: 'Dyllan Vangemert',
//       dob: '11-07-1992',
//       image: 'dyllan.jpg',
//       catchPhrase: "I'm just here for the pitches.",
//       baseballIcon: 'Edgar Martinez',
//       superhero: 'Batman',
//       position: 'P',
//       batsThrows: 'R/R',
//       jerseyNumber: 11,
//       atBatSong: {
//          event: 'at-bat',
//          songFile: 'batman.mp3',
//          label: 'Batman Theme Song',
//          startAt: 0
//       },
//       celebrationSong: {
//          event: 'celebration',
//          songFile: 'whiteboy.mp3',
//          label: 'Play That Funky Music - Wild Cherry',
//          startAt: 68000
//       }
//    },
//    {
//       name: 'Rose Hope',
//       dob: '04-28-1995',
//       image: 'rose.jpg',
//       catchPhrase: '',
//       baseballIcon: '',
//       superhero: 'The Flash',
//       position: 'OF',
//       batsThrows: 'R/R',
//       jerseyNumber: 5,
//       atBatSong: {
//          event: 'at-bat',
//          songFile: 'comegetlove.mp3',
//          label: 'Come and Get Your Love - Redbone',
//          startAt: 0
//       },
//       celebrationSong: {
//          event: 'celebration',
//          songFile: '',
//          label: '',
//          startAt: 0
//       }
//    },
//    {
//       name: 'Dalia Elledge',
//       dob: '03-31-1994',
//       image: '',
//       catchPhrase: "I'd swing at that. ",
//       baseballIcon: 'Felix Hernandez',
//       superhero: 'Tupac',
//       position: 'OF',
//       batsThrows: 'R/R',
//       jerseyNumber: 31,
//       atBatSong: {
//          event: 'at-bat',
//          songFile: 'badblood.mp3',
//          label: 'Bad Blood - Taylor Swift',
//          startAt: 0
//       },
//       celebrationSong: {
//          event: 'celebration',
//          songFile: 'prayer.mp3',
//          label: 'Livin on a Prayer - Bon Jovi',
//          startAt: 158000
//       }
//    },
//    {
//       name: 'Michael Elledge',
//       dob: '09-22-1989',
//       image: '',
//       catchPhrase: 'Put the Cookie Down',
//       baseballIcon: 'Ken Griffey Jr',
//       superhero: 'Iron Man',
//       position: 'IF',
//       batsThrows: 'R/R',
//       jerseyNumber: 19,
//       atBatSong: {
//          event: 'at-bat',
//          songFile: 'runtothehills.mp3',
//          label: 'Run to the Hills - Iron Madien',
//          startAt: 69000
//       },
//       celebrationSong: {
//          event: 'celebration',
//          songFile: 'miss_queen.mp3',
//          label: 'Mississippi Queen - Mountain ',
//          startAt: 9000
//       }
//    }
// ]);
