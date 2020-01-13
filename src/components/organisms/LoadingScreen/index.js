import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

export class LoadingScreen extends Component {
  render() {
    const {zIndex, hidden} = this.props;
    const style = {
      ...styles.container,
      zIndex: zIndex,
    };
    if (!hidden) {
      return (
        <View style={style}>
          <ActivityIndicator size="large" color="#444447" />
        </View>
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#272727',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
