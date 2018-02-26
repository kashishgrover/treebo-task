import React from 'react';
import { Text, ScrollView, View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Toast } from 'native-base';
import { inject, observer } from 'mobx-react';

import Layout from '../constants/Layout';
import Header from '../components/Header';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//This is just a demo -- The actual dates would be passed as props :)
let today = new Date();
let dd1 = today.getDate();
let MM1 = months[today.getMonth()];

let tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
let dd2 = tomorrow.getDate();
let MM2 = months[tomorrow.getMonth()];

@inject('hotelStore')
@observer
export default class HotelScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.id = this.props.navigation.state.params;
    this.details = {};
  }

  async componentDidMount() {
    await this.getDetails();
  }

  async getDetails() {
    try {
      let res = await this.props.hotelStore.fetchHotelDetails();
      if (res) {
        this.details = res;
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
    const { name, locality, image, price } = this.props.hotelStore.hotels[this.id];

    const Prices = (
      <View style={styles.textWrapper}>
        <Text style={styles.h1}>Prices</Text>
        {Object.keys(price).map((keyName, keyIndex) => (
          <Text key={keyIndex} style={!price[keyName] && { textDecorationLine: 'line-through' }}>
            <Text style={styles.sh1}>
              {keyName.charAt(0).toUpperCase() + keyName.slice(1) + ': '}
            </Text>
            <Text style={styles.sh2}>{price[keyName] ? '₹ ' + price[keyName] : 'Sold Out'}</Text>
          </Text>
        ))}
      </View>
    );

    let Essentials = <View />;
    let Policies = <View />;
    if (!this.state.loading) {
      Essentials = (
        <View style={styles.textWrapper}>
          <Text style={styles.h1}>Essentials</Text>
          {this.details.essentials.map((val, index) => (
            <Text key={index} style={styles.sh1}>
              {val}
            </Text>
          ))}
        </View>
      );
      Policies = (
        <View style={styles.textWrapper}>
          <Text style={styles.h1}>Policies</Text>
          {this.details.policies.map((val, index) => (
            <Text key={index} style={styles.sh1}>
              {val}
            </Text>
          ))}
        </View>
      );
    }

    return (
      <View>
        <Header
          navigation={this.props.navigation}
          h1={`Treebo ${name}, ${locality}`}
          h2={`${dd1} ${MM1} - ${dd2} ${MM2}`}
        />
        <ScrollView style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
          {Prices}
          {!this.state.loading ? Essentials : <ActivityIndicator size="large" />}
          {!this.state.loading && Policies}
          <View style={styles.bottomPadder} />
        </ScrollView>
      </View>
    );
  }
}

const WIDTH = Layout.window.width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  imageContainer: {
    width: WIDTH,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: WIDTH - 32,
    height: 268,
    margin: 16,
    borderRadius: 4,
  },
  textWrapper: {
    paddingLeft: 16,
    marginBottom: 20,
  },
  h1: {
    fontWeight: '500',
    fontSize: 20,
    color: '#0eb550',
  },
  sh1: {
    fontWeight: '500',
    fontSize: 16,
    color: '#212121',
  },
  sh2: {
    fontSize: 16,
    color: '#888',
  },
  bottomPadder: {
    height: 80,
  },
});
