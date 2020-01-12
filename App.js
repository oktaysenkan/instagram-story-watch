import React, {Component} from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import UsernameInput from './src/components/atoms/inputs';
import Snackbar from './src/components/organisms/snackbar';

export class App extends Component {
  onSubmit = text => {
    console.log(text);
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.content}>
          <UsernameInput onSubmit={this.onSubmit} />
        </View>
        <Snackbar>Error</Snackbar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1544E3',
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  content: {
    flex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  snackbar: {
    backgroundColor: 'blue',
  },
});

export default App;
