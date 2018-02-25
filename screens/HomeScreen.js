import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Toast } from 'native-base';
import * as _ from 'lodash';

@inject('productStore')
@observer
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.loadHotelDetails = this.loadHotelDetails.bind(this);
    this.hotels = [];
  }

  async componentWillMount() {
    try {
      let res = await this.props.productStore.fetchHotels();
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

  loadHotelDetails(item) {
    this.props.navigation.navigate('Product', item);
  }

  render() {
    return (
      <View>
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            keyExtractor={item => item.name}
            data={_.values(this.props.productStore.hotels)}
            renderItem={data => {
              console.log(data);
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    margin: 12,
                    elevation: 2,
                    borderRadius: 8,
                  }}
                  onPress={() => this.loadHotelDetails(data.item)}>
                  <Text>{data.item.name}</Text>
                </TouchableOpacity>
              );
            }}
            contentContainerStyle={{ flexGrow: 1, overflow: 'hidden' }}
            showsVerticalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            removeClippedSubviews={false}
          />
        )}
      </View>
    );
  }
}
