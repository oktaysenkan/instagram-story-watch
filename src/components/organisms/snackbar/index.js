import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Fonts} from 'utils';

export class Snackbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };
  }

  UNSAFE_componentWillReceiveProps() {
    this.setTimer();
    this.setState({visible: true});
  }

  componentDidMount() {
    this.setTimer();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  setTimer = () => {
    const {duration} = this.props;
    this.timer != null ? clearTimeout(this.timer) : null;
    this.timer = setTimeout(() => {
      this.setState({visible: false});
      this.timer = null;
    }, duration);
  };

  render() {
    const {message} = this.props;
    const {visible} = this.state;
    if (message && visible) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>{message}</Text>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1D1D1D',
    width: '100%',
    borderRadius: 5,
  },
  text: {
    paddingVertical: 16,
    paddingLeft: 20,
    color: '#ffffff',
    fontFamily: Fonts.ProductSansRegular,
    fontSize: 12,
  },
});

export default Snackbar;
