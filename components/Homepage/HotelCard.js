import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Toast } from 'native-base';
import Layout from '../../constants/Layout';

@inject('hotelStore')
@observer
export default class HotelCard extends React.Component {
  constructor(props) {
    super(props);
    this.loadHotelDetails = this.loadHotelDetails.bind(this);
    this.state = {
      imageLoading: true,
      priceLoading: true,
    };
  }

  componentWillMount() {
    this.props.hotelStore
      .fetchHotelPrices()
      .then(res => {
        if (res === 200) {
          this.setState({
            priceLoading: false,
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
            imageLoading: false,
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

  loadHotelDetails(item) {
    this.props.navigation.navigate('Product', item);
  }

  getMinPrice(price) {
    console.log(price);
  }

  render() {
    const { name, city, locality, image, price } = this.props.data.item;
    let minPrice;
    if (price) minPrice = this.getMinPrice(price);

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.container}
        onPress={() => this.loadHotelDetails(this.props.data.item)}>
        <View style={styles.imageWrapper}>
          {this.state.imageLoading ? (
            <ActivityIndicator />
          ) : (
            <Image source={{ uri: image }} style={styles.image} />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.h1}>
            {name}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.h2}>
            {locality}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const leftWidth = Layout.window.width * 0.41;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 2,
    borderBottomColor: '#eeeeee',
    padding: 16,
    elevation: 1,
    flexDirection: 'row',
  },
  imageWrapper: {
    height: 100,
    width: leftWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 100,
    width: leftWidth,
  },
  textContainer: {
    width: 200,
    height: 50,
    marginLeft: 16,
  },
  h1: {
    fontWeight: '600',
    fontSize: 16,
    color: '#212121',
  },
  h2: {
    color: '#9b9b9b',
  },
});
