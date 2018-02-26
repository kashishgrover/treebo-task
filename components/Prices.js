import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Prices = ({ prices }) => {
  return (
    <View style={styles.textWrapper}>
      <Text style={styles.h1}>Prices</Text>
      {Object.keys(prices).map((keyName, keyIndex) => (
        <Text key={keyIndex} style={!prices[keyName] && { textDecorationLine: 'line-through' }}>
          <Text style={styles.sh1}>
            {keyName.charAt(0).toUpperCase() + keyName.slice(1) + ': '}
          </Text>
          <Text style={styles.sh2}>{prices[keyName] ? '₹ ' + prices[keyName] : 'Sold Out'}</Text>
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Prices;
