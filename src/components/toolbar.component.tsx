import {
   Button,
   Divider,
   MenuItem,
   MenuItemProps,
   OverflowMenu,
   // OverflowMenuItemType,
   StyleType,
   Text,
   TextProps,
   TopNavigation,
   TopNavigationAction,
   TopNavigationActionElement,
   TopNavigationProps
} from '@ui-kitten/components';
import React, { Fragment, useContext } from 'react';
import { ImageProps, View } from 'react-native';
import { useScreenSize } from '../utils/hooks';
import { BackIcon, MoreVerticalIcon } from './icons';
import { StatusBarContext } from './status-bars';

export type ToolbarMenu = MenuItemProps[];

export interface ToolbarProps extends TopNavigationProps {
   menu?: ToolbarMenu;
   backIcon?: (style: StyleType) => React.ReactElement<ImageProps>;
   rightAccessoryIcon?: (style: StyleType) => React.ReactElement<ImageProps>;
   rightAccessorySelectCB?: (index: number) => void;
   onBackPress?: () => void;
   customLeftMenu?: any;
   customRightMenu?: any;
   bottomDivider?: boolean;
   backgroundColor?: string;
   titleCategory?: TextProps['category'];
}

export const Toolbar = (props: ToolbarProps): TopNavigationActionElement => {
   const {
      menu,
      backIcon,
      rightAccessoryIcon,
      rightAccessorySelectCB,
      onBackPress,
      customLeftMenu,
      customRightMenu,
      bottomDivider = false,
      backgroundColor = null,
      titleCategory = 'h6',
      ...rest
   } = props;

   const topNavigationProps = { ...rest, appearance: 'control' };
   const [rightAccessoryContentVisible, setRightAccessoryContentVisible] =
      React.useState(false);

   const onRightAccessorySelect = index => {
      setRightAccessoryContentVisible(false);
      rightAccessorySelectCB && rightAccessorySelectCB(index);
   };

   const onMenuActionPress = () => {
      setRightAccessoryContentVisible(!rightAccessoryContentVisible);
   };

   const renderRightAccessory = (): TopNavigationActionElement => {
      if (menu)
         return (
            <OverflowMenu
               visible={rightAccessoryContentVisible}
               // data={menu}
               placement='bottom end'
               onSelect={onRightAccessorySelect}
               onBackdropPress={onMenuActionPress}
               anchor={() => {
                  return (
                     <TopNavigationAction
                        appearance={'control'}
                        icon={props.rightAccessoryIcon || MoreVerticalIcon}
                        onPress={onMenuActionPress}
                     />
                  );
               }}
            >
               {menu.map(item => {
                  return (
                     <MenuItem
                        title={item.title}
                        accessoryLeft={item.accessoryLeft}
                        accessoryRight={item.accessoryRight}
                        selected={item.selected}
                        descriptor={item.descriptor}
                        appearance={'control'}
                        onPress={item.onPress}
                     />
                  );
               })}
            </OverflowMenu>
         );
      else if (!!customRightMenu) return customRightMenu;
      else return <Fragment></Fragment>;
   };

   const renderLeftAccessory = (): TopNavigationActionElement => {
      if (!!customLeftMenu) return customLeftMenu;
      else return <Fragment></Fragment>;
   };

   const renderBackAction = (): TopNavigationActionElement => {
      return (
         // <TouchableOpacity
         //    onPress={() => {
         //       onBackPress();
         //    }}
         // >
         //    <TopNavigationAction
         //       appearance={'control'}
         //       icon={props.backIcon || BackIcon}
         //    />
         // </TouchableOpacity>
         <Button
            onPress={() => {
               onBackPress();
            }}
            status={'control'}
            appearance={'ghost'}
            accessoryLeft={props.backIcon || BackIcon}
         />
      );
   };
   const { backgroundColor: statusBarBackgroundColor } =
      useContext(StatusBarContext);
   const screenSize = useScreenSize();
   return (
      <React.Fragment>
         <TopNavigation
            {...topNavigationProps}
            //@ts-ignore
            title={
               typeof topNavigationProps.title === 'string' ||
               typeof topNavigationProps.title === 'number' ? (
                  eva => (
                     <Text
                        status={'control'}
                        category={titleCategory}
                        style={{ fontWeight: 'normal', letterSpacing: 1 }}
                     >
                        {topNavigationProps.title as string}
                     </Text>
                  )
               ) : (
                  <View
                     style={{
                        height: '100%',
                        transform: [{ translateY: 3 }],
                        justifyContent: 'center'
                     }}
                  >
                     <topNavigationProps.title />
                  </View>
               )
            }
            appearance={'control'}
            alignment='center'
            accessoryLeft={
               (onBackPress && renderBackAction) || renderLeftAccessory
            }
            accessoryRight={renderRightAccessory}
            style={{
               backgroundColor: backgroundColor || statusBarBackgroundColor
            }}
         />
         {bottomDivider && <Divider />}
      </React.Fragment>
   );
};
