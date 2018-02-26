import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Toast } from 'native-base';
import * as _ from 'lodash';

import HotelCard from './HotelCard';

@inject('hotelStore')
@observer
export default class HotelFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingHotels: true,
      loadingImages: true,
      loadingPrices: true,
    };
    this.hotels = [];
  }

  async componentDidMount() {
    await this.getList();
    await this.getPrices();
    await this.getImages();
  }

  async getList() {
    try {
      let res = await this.props.hotelStore.fetchHotels();
      if (res === 200) {
        this.setState({ loadingHotels: false });
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

  async getPrices() {
    try {
      let res = await this.props.hotelStore.fetchHotelPrices();
      if (res === 200) {
        this.setState({ loadingPrices: false });
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

  async getImages() {
    try {
      let res = await this.props.hotelStore.fetchHotelImages();
      if (res === 200) {
        this.setState({ loadingImages: false });
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
    return this.state.loadingHotels ? (
      <ActivityIndicator size="large" />
    ) : (
      <FlatList
        keyExtractor={item => item.name}
        data={_.values(this.props.hotelStore.hotels)}
        renderItem={data => (
          <HotelCard
            loadingPrices={this.state.loadingPrices}
            loadingImages={this.state.loadingImages}
            item={data.item}
            navigation={this.props.navigation}
          />
        )}
        scrollEnabled={false}
      />
    );
  }
}
