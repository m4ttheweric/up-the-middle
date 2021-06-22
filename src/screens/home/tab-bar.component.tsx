import {
   BottomNavigation,
   BottomNavigationTab,
   BottomNavigationTabElement,
   Divider,
   Layout
} from '@ui-kitten/components';
import React, { useContext } from 'react';
import { BottomBarContext } from '../../components/status-bars';

export const HomeTabBar: React.FC<any> = props => {
   const onSelect = (index: number): void => {
      const selectedTabRoute: string = props.state.routeNames[index];
      props.navigation.navigate(selectedTabRoute);
   };

   const createNavigationTabForRoute = (route): BottomNavigationTabElement => {
      const { options } = props.descriptors[route.key];
      return (
         <BottomNavigationTab
            key={route.key}
            title={options.title}
            icon={options.tabBarIcon}
         />
      );
   };
   const { backgroundColor } = useContext(BottomBarContext);
   return (
      <Layout>
         <Divider />
         <BottomNavigation
            style={{
               backgroundColor: backgroundColor
            }}
            //appearance='noIndicator'
            selectedIndex={props.state.index}
            onSelect={onSelect}
         >
            {props.state.routes.map(createNavigationTabForRoute)}
         </BottomNavigation>
      </Layout>
   );
};
