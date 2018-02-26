import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { inject, observer } from 'mobx-react';

import Header from '../components/Header';

@inject('hotelStore')
@observer
export default class HotelScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    const { city, name, locality, image, price } = this.props.navigation.state.params;
    return (
      <ScrollView>
        <Header navigation={this.props.navigation} />
        <Text>{name}</Text>
        <Text>{locality}</Text>
        <Text>{city}</Text>
        <Text>{image}</Text>
        <Text>{JSON.stringify(price)}</Text>
      </ScrollView>
    );
  }
}
