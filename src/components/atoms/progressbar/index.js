import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export class ProgressBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.progressBar} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 2,
    backgroundColor: 'background: rgba(255, 255, 255, 0.5)',
    borderRadius: 1.5,
    height: 2,
    flex: 1,
  },
  progressBar: {
    height: '100%',
    width: '60%',
    backgroundColor: '#FFFFFF',
  },
});

export default ProgressBar;
