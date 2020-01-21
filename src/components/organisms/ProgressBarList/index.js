import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {ProgressBar, AnimatedProgressBar} from 'components';

export class ProgressBarList extends Component {
  numberToArray = number => {
    let array = [];
    for (let index = 0; index < number; index++) {
      array.push(100);
    }
    return array;
  };

  render() {
    const {
      totalBars,
      zIndex,
      finishedBars,
      loading,
      paused,
      duration,
    } = this.props;
    let finishedBarArray = this.numberToArray(finishedBars);
    let remaingBarArray = this.numberToArray(totalBars - finishedBars - 1);
    const style = {
      ...styles.container,
      zIndex,
    };
    return (
      <View style={style}>
        {finishedBarArray.map((story, i) => {
          return <ProgressBar key={i} value={100} />;
        })}
        <AnimatedProgressBar
          loading={loading}
          paused={paused}
          duration={duration}
          finishedBars={finishedBars}
        />
        {remaingBarArray.map((story, i) => {
          return <ProgressBar key={i} value={0} />;
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
