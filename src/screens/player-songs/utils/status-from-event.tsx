import { Song } from '../../../data/player-data';

export const statusFromEvent = (event: Song['event']) =>
   event === 'at-bat' ? 'info' : 'primary';
