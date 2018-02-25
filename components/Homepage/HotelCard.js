import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import Layout from '../../constants/Layout';

export default class HotelCard extends React.Component {
  constructor(props) {
    super(props);
    this.loadHotelDetails = this.loadHotelDetails.bind(this);
  }

  loadHotelDetails(item) {
    this.props.navigation.navigate('Product', item);
  }

  getMinPrice(price) {
    let arr = Object.values(price);
    arr = arr.filter(element => {
      return element !== null;
    });
    return Math.min(...arr);
  }

  render() {
    const { name, city, locality, image, price } = this.props.data.item;
    let minPrice;
    if (price) minPrice = this.getMinPrice(price);

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.container, { opacity: minPrice === Infinity ? 0.8 : 1 }]}
        onPress={() => this.loadHotelDetails(this.props.data.item)}>
        <View style={styles.imageWrapper}>
          {this.props.loadingImages ? (
            <ActivityIndicator />
          ) : (
            <Image source={{ uri: image }} style={styles.image} />
          )}
        </View>
        <View style={styles.metaWrap}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.h1}>
            {name}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.h2}>
            {locality}
          </Text>
          {this.props.loadingImages ? (
            <View style={styles.textContainer}>
              <ActivityIndicator />
            </View>
          ) : (
            <View style={styles.textContainer}>
              <Text style={minPrice === Infinity ? styles.soldOut : styles.price}>
                {minPrice === Infinity ? 'SOLD OUT' : '₹ ' + minPrice}
              </Text>
              {minPrice !== Infinity && <Text style={styles.h2}>Incl. of all taxes</Text>}
            </View>
          )}
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
  metaWrap: {
    marginLeft: 16,
    width: 200,
    height: 100,
  },
  textContainer: {
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    justifyContent: 'center',
  },
  h1: {
    fontWeight: '600',
    fontSize: 16,
    color: '#212121',
  },
  h2: {
    color: '#9b9b9b',
  },
  price: {
    marginTop: 12,
    fontWeight: '500',
    fontSize: 16,
    color: '#212121',
  },
  soldOut: {
    color: 'red',
    marginTop: 32,
  },
});
