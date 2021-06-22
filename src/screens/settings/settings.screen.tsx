import React, { useRef, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { Toolbar } from '../../components/toolbar.component';

interface SettingsScreenProps {}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ children }) => {
   return (
      <Layout style={{ flex: 1 }}>
         <Toolbar title='Settings' />
         <Text>These are settings!</Text>
      </Layout>
   );
};
