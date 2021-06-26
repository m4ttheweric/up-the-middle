import React, { useRef, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { Toolbar } from '../../components/toolbar.component';
import { PLAYERS } from '../../data/player-data';
import { PlayerDetail } from '../player-songs/components/player-detail';
import { useKittenTheme } from '../../components/use-kitten-theme-wrapper';

export const RosterScreen: React.FC = ({ children }) => {
   const theme = useKittenTheme();
   return (
      <Layout style={{ flex: 1 }}>
         <Toolbar title='Team Roster' />
         <ScrollView>
            {PLAYERS.map(p => (
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
