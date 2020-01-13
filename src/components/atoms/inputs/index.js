import React, {Component} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Fonts} from '../../../utils/Fonts';

export class UsernameInput extends Component {
  onSubmit = event => {
    const {onSubmit} = this.props;
    onSubmit(event.nativeEvent.text);
    console.log(event.nativeEvent.text);
  };

  render() {
    return (
      <TextInput
        style={styles.container}
        placeholder="Username"
        autoCorrect={false}
        autoCapitalize="none"
        onSubmitEditing={this.onSubmit}>
        {this.props.children}
      </TextInput>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: '100%',
    paddingVertical: 16,
    paddingLeft: 20,
    color: '#303030',
    fontFamily: Fonts.ProductSansMedium,
    fontSize: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default UsernameInput;
