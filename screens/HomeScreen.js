import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Toast } from 'native-base';
import _ from 'lodash';

@inject('productStore')
@observer
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.loadProduct = this.loadProduct.bind(this);
    this.hotels = [];
  }

  async componentWillMount() {
    try {
      let res = await this.props.productStore.fetchHotels();
      if (res === 200) {
        this.hotels = await this.convertObjectToArray(this.props.productStore.hotels);
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

  loadProduct() {
    this.props.navigation.navigate('Product');
  }

  render() {
    console.log('render');
    return (
      <View>
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <TouchableOpacity activeOpacity={0.8} onPress={this.loadProduct}>
            <Text>Click me</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
