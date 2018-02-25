import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Layout from '../../constants/Layout';

export default class HotelCard extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>name</Text>
      </View>
    );
  }
}

const HEIGHT = Layout.window.height / 1.8;
const WIDTH = Layout.window.width;

const styles = StyleSheet.create({});
