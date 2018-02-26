import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Layout from '../constants/Layout';

const Banner = () => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Image
          source={require('../assets/images/homepage-banner.jpg')}
          style={styles.backdrop}
          resizeMode="cover"
        />
      </View>
      <Image source={require('../assets/images/splash-white.png')} style={styles.logo} />
      <View style={styles.textContainer}>
        <Text style={styles.h1}>India's Top Rated Hotel Chain</Text>
        <Text style={styles.h2}>Good rooms. Good Service. Good Prices.</Text>
      </View>
    </View>
  );
};

const HEIGHT = Layout.window.height / 1.8;
const WIDTH = Layout.window.width;

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    marginBottom: 24,
  },
  backgroundContainer: {
    position: 'absolute',
    height: HEIGHT,
    width: WIDTH,
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column',
    height: HEIGHT,
    width: WIDTH,
  },
  logo: {
    width: 160,
    height: 80,
    paddingTop: 12,
    paddingLeft: 12,
  },
  textContainer: {
    position: 'absolute',
    bottom: 24,
    left: 12,
  },
  h1: {
    fontWeight: '600',
    fontSize: 24,
    color: 'white',
  },
  h2: {
    fontWeight: '400',
    fontSize: 16,
    color: 'white',
  },
});

export default Banner;
