import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Toast } from 'native-base';
import * as _ from 'lodash';

import HotelCard from './HotelCard';

@inject('hotelStore')
@observer
export default class HotelFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.hotels = [];
  }

  async componentWillMount() {
    try {
      let res = await this.props.hotelStore.fetchHotels();
      if (res === 200) {
        this.setState({ loading: false });
      } else {
        Toast.show({
          text: "An error occurred while loading. :'(",
          type: 'warning',
        });
      }
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    return this.state.loading ? (
      <ActivityIndicator size="large" />
    ) : (
      <FlatList
        keyExtractor={item => item.name}
        data={_.values(this.props.hotelStore.hotels)}
        renderItem={data => <HotelCard data={data} navigation={this.props.navigation} />}
        contentContainerStyle={{ flexGrow: 1, overflow: 'hidden' }}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        removeClippedSubviews={false}
      />
    );
  }
}
