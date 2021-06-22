import * as eva from '@eva-design/eva';
import { mapping } from '@eva-design/eva';
import {
   ApplicationProvider as KittenProvider,
   IconRegistry
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as themey } from '../../utm-theme.json'; // <-- Import app theme
import React from 'react';

import AppStorage from '../app-storage/provider';
import { StatusBarsProvider } from './status-bars';

export default function ApplicationProvider({ children }) {
   const [theme] = AppStorage.useGlobal('uiTheme');
   return (
      <KittenProvider
         mapping={mapping}
         {...eva}
         theme={{ ...eva[theme], ...themey }}
      >
         <IconRegistry icons={EvaIconsPack} />
         <StatusBarsProvider>{children}</StatusBarsProvider>
      </KittenProvider>
   );
}
