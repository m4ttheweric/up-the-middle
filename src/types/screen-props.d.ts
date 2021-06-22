import { StackScreenProps } from '@react-navigation/stack';

export type ScreenProps<
   Props extends Record<string, any>,
   RouteName extends string = 'route'
> = StackScreenProps<{ [key in RouteName]: Props }, RouteName>;
