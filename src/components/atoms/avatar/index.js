import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';

export class Avatar extends Component {
  render() {
    const {url} = this.props;
    return <Image style={styles.avatar} source={{uri: url}} />;
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 25,
  },
});

export default Avatar;
