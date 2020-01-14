import React, {Component} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

export class AnimatedProgressBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barAnim: new Animated.Value(0),
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {barAnim} = this.state;
    if (this.props.paused) {
      this.pauseAnimate();
      return;
    }

    if (this.props.finishedBars !== prevProps.finishedBars) {
      // Story Changed
      this.duration = null;
      barAnim.setValue(0);
    }

    if (!this.props.loading) {
      // Story onLoad
      this.duration = this.duration ? this.duration : this.props.duration;
      this.startAnimate();
      return;
    }
  }

  startAnimate = () => {
    const {barAnim} = this.state;
    Animated.timing(barAnim, {
      toValue: 100,
      duration: this.duration,
    }).start();
    this.startTime = new Date();
  };

  pauseAnimate = () => {
    const {barAnim} = this.state;
    this.duration -= new Date() - this.startTime;
    barAnim.setValue(barAnim._value);
  };

  render() {
    const progressBarStyle = {
      ...styles.progressBar,
      width: this.state.barAnim.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
      }),
      flex: this.state.barAnim.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
      }),
    };
    return (
      <View style={styles.container}>
        <Animated.View style={progressBarStyle} />
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
    display: 'flex',
    flexDirection: 'row',
  },
  progressBar: {
    height: '100%',
    width: '1%',
    backgroundColor: '#FFFFFF',
  },
});

export default AnimatedProgressBar;
