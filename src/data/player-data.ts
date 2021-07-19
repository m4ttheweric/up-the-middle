export interface Song {
   event: 'at-bat' | 'celebration';
   songFile: any;
   label: string;
   startAt: number;
}

export interface IPlayer {
   name: string;
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
   `https://up-the-middle.web.app/images/${file}`;

export const PLAYERS = Object.freeze<IPlayer[]>([
   {
      name: 'James Pura',

      dob: '06-18-1984',
      image: 'james.jpg',
      catchPhrase: "Let's Rock 'n Roll",
      baseballIcon: 'Mark Langston',
      superhero: 'Deadpool',
      position: 'CF',
      batsThrows: 'R/R',
      jerseyNumber: 0,
      atBatSong: {
         event: 'at-bat',
         songFile: 'immigrant_song.mp3',
         label: 'Immigrant Song',
         startAt: 0
      },
      celebrationSong: {
         event: 'celebration',
         songFile: '',
         label: '',
         startAt: 0
      }
   },
   {
      name: 'Matt Goodwin',
      dob: '10-22-1985',
      image: 'matt.jpg',
      catchPhrase: 'Never stop running!',
      baseballIcon: 'Luis Ugeuto',
      superhero: 'Loki',
      position: 'LF',
      batsThrows: 'R/R',
      jerseyNumber: 22,
      atBatSong: {
         event: 'at-bat',
         songFile: 'bigblue.mp3',
         label: 'F-Zero: Big Blue',
         startAt: 10000
      },
      celebrationSong: {
         event: 'celebration',
         songFile: 'smw_complete.mp3',
         label: 'Super Mario World: Stage Complete',
         startAt: 0
      }
   },
   {
      name: 'Jackie Tiffin',
      dob: '12-28-1987',
      image: '',
      catchPhrase: 'Life is short. Play hard!',
      baseballIcon: 'Joey Cora',
      superhero: 'The Mandalorian',
      position: '2B',
      batsThrows: 'R/R',
      jerseyNumber: 0,
      atBatSong: {
         event: 'at-bat',
         songFile: 'mando.mp3',
         label: 'Mandalorian Theme Song',
         startAt: 70000
      },
      celebrationSong: {
         event: 'celebration',
         songFile: 'wanna_rock.mp3',
         label: 'I Wanna Rock - Twisted Sister',
         startAt: 0
      }
   },
   {
      name: 'Alison Wendler',
      dob: '01-13-1995',
      image: '',
      catchPhrase: 'Grab Some Pine, Meat!',
      baseballIcon: 'Buster Posey',
      superhero: 'Buffy the Vampire Slayer',
      position: 'Util',
      batsThrows: 'R/R',
      jerseyNumber: 0,
      atBatSong: {
         event: 'at-bat',
         songFile: 'armyofme.mp3',
         label: 'Army of Me - Bjork',
         startAt: 0
      },
      celebrationSong: {
         event: 'celebration',
         songFile: 'superman.mp3',
         label: 'Superman - REM',
         startAt: 16000
      }
   },
   {
      name: 'Danika Mowery',
      dob: '07-27-1992',
      image: '',
      catchPhrase: 'I have sunscreen!',
      baseballIcon: 'Ichiro Suzuki',
      superhero: 'Batgirl',
      position: 'C',
      batsThrows: 'R/R',
      jerseyNumber: 0,
      atBatSong: {
         event: 'at-bat',
         songFile: 'lefthand.mp3',
         label: 'Left Hand Free - Alt J',
         startAt: 0
      },
      celebrationSong: {
         event: 'celebration',
         songFile: 'happy.mp3',
         label: 'Happy - Pharrel WIlliams',
         startAt: 24000
      }
   },
   {
      name: 'Jacob Yackshaw',
      dob: '12-18-1985',
      image: '',
      catchPhrase: 'The power is yours!',
      baseballIcon: 'John Olerud',
      superhero: 'Captain Planet',
      position: '3B',
      batsThrows: 'L/L',
      jerseyNumber: 0,
      atBatSong: {
         event: 'at-bat',
         songFile: 'aatw.mp3',
         label: 'Red Hot Chili Peppers - Around The World',
         startAt: 7000
      },
      celebrationSong: {
         event: 'celebration',
         songFile: '',
         label: '',
         startAt: 0
      }
   },
   {
      name: 'Jared Bigelow',
      dob: '12-24-1983',
      image: '',
      catchPhrase: 'Skirrrp skirrrp',
      baseballIcon: 'Robinson Canó',
      superhero: 'Black Panther',
      position: 'IF',
      batsThrows: 'R/R',
      jerseyNumber: 0,
      atBatSong: {
         event: 'at-bat',
         songFile: 'famous.mp3',
         label: 'Famous - Curren$y',
         startAt: 0
      },
      celebrationSong: {
         event: 'celebration',
         songFile: 'mack.mp3',
         label: 'Mark Morrison - Return of the Mack',
         startAt: 110000
      }
   },
   {
      name: 'Noah Anderson',
      dob: '09-05-1989',
      image: '',
      catchPhrase: "There's always next year.",
      baseballIcon: 'Dan Wilson',
      superhero: '',
      position: 'SS',
      batsThrows: 'R/R',
      jerseyNumber: 0,
      atBatSong: { event: 'at-bat', songFile: '', label: '', startAt: 0 },
      celebrationSong: {
         event: 'celebration',
         songFile: '',
         label: '',
         startAt: 0
      }
   },
   {
      name: 'Kate Johnson',
      dob: '10-20-1984',
      image: '',
      catchPhrase: 'Bring it on',
      baseballIcon: 'Ken Griffey Jr.',
      superhero: 'Scarlet Witch',
      position: 'C',
      batsThrows: 'R/R',
      jerseyNumber: 0,
      atBatSong: { event: 'at-bat', songFile: '', label: '', startAt: 0 },
      celebrationSong: {
         event: 'celebration',
         songFile: '',
         label: '',
         startAt: 0
      }
   },
   {
      name: 'Dyllan Vangemert',
      dob: '11-07-1992',
      image: '',
      catchPhrase: "I'm just here for the pitches.",
      baseballIcon: 'Edgar Martinez',
      superhero: 'Batman',
      position: 'P',
      batsThrows: 'R/R',
      jerseyNumber: 0,
      atBatSong: {
         event: 'at-bat',
         songFile: '',
         label: 'Batman Theme Song',
         startAt: 0
      },
      celebrationSong: {
         event: 'celebration',
         songFile: '',
         label: 'Play That Funky Music - Wild Cherry',
         startAt: 0
      }
   },
   {
      name: 'Rose Hope',
      dob: '04-28-1995',
      image: '',
      catchPhrase: '',
      baseballIcon: '',
      superhero: '',
      position: 'OF',
      batsThrows: 'R/R',
      jerseyNumber: 0,
      atBatSong: {
         event: 'at-bat',
         songFile: '',
         label: 'Come and Get Your Love - Redbone',
         startAt: 0
      },
      celebrationSong: {
         event: 'celebration',
         songFile: '',
         label: '',
         startAt: 0
      }
   },
   {
      name: 'Dalia Elledge',
      dob: '03-31-1994',
      image: '',
      catchPhrase: "I'd swing at that. ",
      baseballIcon: 'M',
      superhero: '',
      position: 'OF',
      batsThrows: 'R/R',
      jerseyNumber: 0,
      atBatSong: { event: 'at-bat', songFile: '', label: '', startAt: 0 },
      celebrationSong: {
         event: 'celebration',
         songFile: '',
         label: '',
         startAt: 0
      }
   },
   {
      name: 'Michael Elledge',
      dob: '09-22-1989',
      image: '',
      catchPhrase: '',
      baseballIcon: '',
      superhero: '',
      position: 'IF',
      batsThrows: 'R/R',
      jerseyNumber: 0,
      atBatSong: { event: 'at-bat', songFile: '', label: '', startAt: 0 },
      celebrationSong: {
         event: 'celebration',
         songFile: '',
         label: '',
         startAt: 0
      }
   }
]);
