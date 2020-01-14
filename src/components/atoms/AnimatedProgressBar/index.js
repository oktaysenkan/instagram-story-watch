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

    if (this.props.start) {
      console.log('yeni story süresi:', this.props.duration);
      this.duration = this.duration ? this.duration : this.props.duration;
      this.startAnimate();
      return;
    }

    if (this.props.finishedBars !== prevProps.finishedBars) {
      this.duration = null;
      barAnim.setValue(0);
    }
  }

  startAnimate = () => {
    const {barAnim} = this.state;
    console.log('started', barAnim._value);
    Animated.timing(barAnim, {
      toValue: 110,
      duration: this.duration,
    }).start();
    this.startTime = new Date();
  };

  pauseAnimate = () => {
    const {barAnim} = this.state;
    console.log('paused', barAnim._value);
    this.duration -= new Date() - this.startTime;
    console.log('remaining', this.duration);
    barAnim.setValue(barAnim._value);
  };

  render() {
    const progressBarStyle = {
      ...styles.progressBar,
      transform: [{scaleX: this.state.barAnim}],
      opacity: this.state.barAnim,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    height: '100%',
    width: '1%',
    backgroundColor: '#FFFFFF',
  },
});

export default AnimatedProgressBar;
