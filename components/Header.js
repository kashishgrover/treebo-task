import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Icon } from 'native-base';

const Header = ({ navigation, h1, h2 }) => {
  const _goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8} onPress={_goBack} style={styles.backBtn}>
        <Icon style={styles.backIcon} name="md-arrow-back" />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        {h1 && <Text style={styles.h1}>{h1}</Text>}
        {h2 && <Text style={styles.h2}>{h2}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 1,
    flexDirection: 'row',
  },
  backBtn: {
    position: 'absolute',
    paddingLeft: 16,
    paddingRight: 16,
    top: 0,
    height: 52,
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    paddingTop: 2,
  },
  textContainer: {
    position: 'absolute',
    paddingLeft: 16,
    paddingRight: 16,
    top: 0,
    left: 32,
    height: 52,
    justifyContent: 'center',
  },
  h1: {
    color: '#212121',
  },
  h2: {
    color: '#9b9b9b',
  },
});

export default Header;
