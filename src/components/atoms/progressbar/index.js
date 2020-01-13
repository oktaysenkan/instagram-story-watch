import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

export class ProgressBar extends Component {
  render() {
    const {value} = this.props;
    const progressBarStyle = {
      ...styles.progressBar,
      width: `${value}%`,
    };
    return (
      <View style={styles.container}>
        <View style={progressBarStyle} />
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
    backgroundColor: '#FFFFFF',
  },
});

export default ProgressBar;
