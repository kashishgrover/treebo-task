import React from 'react';
import { ScrollView } from 'react-native';

import Banner from '../components/Homepage/Banner';
import HotelFeed from '../components/Homepage/HotelFeed';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <ScrollView>
        <Banner />
        <HotelFeed />
      </ScrollView>
    );
  }
}
