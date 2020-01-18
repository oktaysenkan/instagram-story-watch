import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

/**
 * Avatar Component
 * @augments {Component<Props, State>}
 */
export class Avatar extends Component {
  static propTypes = {
    url: PropTypes.string,
    isHasStory: PropTypes.bool,
  };

  render() {
    const {url, isHasStory} = this.props;
    console.log(isHasStory);
    let style = {
      ...styles.avatar,
      borderWidth: isHasStory ? 3 : null,
      borderColor: isHasStory ? 'rgba(211, 211, 211, 0.9)' : null,
    };
    return <Image style={style} source={{uri: url}} {...this.props} />;
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
