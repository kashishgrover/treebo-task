import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Essentials = ({ essentials }) => {
  return (
    <View style={styles.textWrapper}>
      <Text style={styles.h1}>Essentials</Text>
      {essentials.map((val, index) => (
        <Text key={index} style={styles.sh1}>
          {val}
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
});

export default Essentials;
