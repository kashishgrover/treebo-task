import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'mobx-react';
import { Root } from 'native-base';
import RootNavigation from './navigation/RootNavigation';
import stores from './stores';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    return (
      <Root>
        <Provider {...stores}>
          <View style={styles.container}>
            <RootNavigation />
          </View>
        </Provider>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
});
