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
   `https://up-the-middle.web.app/songs/${file}?u=1`;
export const ImageHostUrl = (file: string) =>
   `https://up-the-middle.web.app/images/${file}?u=3`;
