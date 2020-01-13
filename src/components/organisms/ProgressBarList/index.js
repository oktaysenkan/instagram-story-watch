import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import ProgressBar from '../../atoms/progressbar';

export class ProgressBarList extends Component {
  numberToArray = number => {
    let array = [];
    for (let index = 0; index < number; index++) {
      array.push(100);
    }
    return array;
  };

  render() {
    const {data, zIndex, finishedBars, currentBarValue} = this.props;
    let finishedBarArray = this.numberToArray(finishedBars);
    let remaingBarArray = this.numberToArray(data.length - finishedBars - 1);
    const style = {
      ...styles.container,
      zIndex,
    };
    return (
      <View style={style}>
        {finishedBarArray.map((story, i) => {
          return <ProgressBar value={100} />;
        })}
        <ProgressBar value={currentBarValue} />
        {remaingBarArray.map((story, i) => {
          return <ProgressBar value={0} />;
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
