import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
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

  async componentWillMount() {
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

  componentDidMount() {
    this.props.hotelStore
      .fetchHotelPrices()
      .then(res => {
        if (res === 200) {
          this.setState({
            loadingPrices: false,
          });
        }
      })
      .catch(e => {
        console.warn(e);
        Toast.show({
          text: "An error occurred while loading. :'(",
          type: 'warning',
        });
      });

    this.props.hotelStore
      .fetchHotelImages()
      .then(res => {
        if (res === 200) {
          this.setState({
            loadingImages: false,
          });
        }
      })
      .catch(e => {
        console.warn(e);
        Toast.show({
          text: "An error occurred while loading. :'(",
          type: 'warning',
        });
      });
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
            data={data}
            navigation={this.props.navigation}
          />
        )}
        scrollEnabled={false}
      />
    );
  }
}
