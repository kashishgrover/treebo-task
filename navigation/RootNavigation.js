import React from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import HotelScreen from '../screens/HotelScreen';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: HomeScreen,
    },
    Product: {
      screen: HotelScreen,
    },
  },
  {
    navigationOptions: () => ({
      header: null,
    }),
  }
);

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator />;
  }
}
