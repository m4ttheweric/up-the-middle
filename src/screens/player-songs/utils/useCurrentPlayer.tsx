import { useContext } from 'react';
import { SongContext } from '../player-songs.screen';

export function useCurrentPlayer() {
   const { currentPlayer } = useContext(SongContext);

   return currentPlayer;
}
