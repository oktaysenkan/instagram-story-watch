import React, {Component} from 'react';
import {Text, View, ActivityIndicator, StyleSheet} from 'react-native';

export class LoadingWrapper extends Component {
  render() {
    return (
      <View style={styles.container} {...this.props}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingWrapper;
