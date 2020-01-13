import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import ProgressBar from '../../atoms/progressbar';

export class ProgressBarList extends Component {
  render() {
    const {data, zIndex} = this.props;
    const style = {
      ...styles.container,
      zIndex,
    };
    return (
      <View style={style}>
        {data.map((story, i) => {
          return <ProgressBar />;
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default ProgressBarList;
