import { Layout } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { PlayersContext } from '../../../App';
import { Toolbar } from '../../components/toolbar.component';
import { useKittenTheme } from '../../components/use-kitten-theme-wrapper';
import { PlayerDetail } from '../player-songs/components/player-detail';

export const RosterScreen: React.FC = ({ children }) => {
   const theme = useKittenTheme();
   const { players } = useContext(PlayersContext);
   return (
      <Layout style={{ flex: 1 }}>
         <Toolbar title='Team Roster' />
         <ScrollView>
            {players?.map(p => (
               <Layout
                  level='2'
                  style={{
                     padding: 12,
                     borderBottomColor: theme['color-basic-500'],
                     borderBottomWidth: 1
                  }}
               >
                  <PlayerDetail player={p} />
               </Layout>
            ))}
         </ScrollView>
      </Layout>
   );
};
