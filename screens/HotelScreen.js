import React from 'react';
import { Text, ScrollView, View, Image, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';

import Layout from '../constants/Layout';
import Header from '../components/Header';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

@inject('hotelStore')
@observer
export default class HotelScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    let res = await this.props.hotelStore.fetchHotelDetails();
    alert(JSON.stringify(res));
  }

  render() {
    const { name, locality, image, price } = this.props.navigation.state.params;

    //This is just a demo -- The actual dates will obviously be passed as props :)
    let today = new Date();
    let dd1 = today.getDate();
    let MM1 = months[today.getMonth()];

    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    let dd2 = tomorrow.getDate();
    let MM2 = months[tomorrow.getMonth()];

    return (
      <ScrollView style={styles.container}>
        <Header
          navigation={this.props.navigation}
          h1={`Treebo ${name}, ${locality}`}
          h2={`${dd1} ${MM1} - ${dd2} ${MM2}`}
        />
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <Text>{JSON.stringify(price)}</Text>
      </ScrollView>
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
});
