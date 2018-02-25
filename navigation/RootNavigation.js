import React from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: HomeScreen,
    },
    Product: {
      screen: ProductScreen,
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
