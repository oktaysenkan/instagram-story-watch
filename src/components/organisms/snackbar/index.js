import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Fonts} from '../../../utils/Fonts';

export class Snackbar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.children}</Text>
      </View>
    );
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
