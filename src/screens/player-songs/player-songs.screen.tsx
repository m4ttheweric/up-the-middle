import React, { useRef, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { Toolbar } from '../../components/toolbar.component';

interface PlayerSongsScreenProps {}
export const PlayerSongsScreen: React.FC<PlayerSongsScreenProps> = ({
   children
}) => {
   return (
      <Layout style={{ flex: 1 }}>
         <Toolbar title='Songs' />
         <Text>These are songs!</Text>
      </Layout>
   );
};
