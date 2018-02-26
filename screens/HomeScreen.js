import React from 'react';
import { ScrollView } from 'react-native';

import Banner from '../components/Banner';
import HotelFeed from '../components/HotelFeed';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <ScrollView>
        <Banner />
        <HotelFeed navigation={this.props.navigation} />
      </ScrollView>
    );
  }
}
