import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Fonts} from 'utils';

/**
 * PostInfo Component
 * @augments {Component<Props, State>}
 */
export class PostInfo extends Component {
  static propTypes = {
    like: PropTypes.number,
    preview: PropTypes.number,
    caption: PropTypes.string,
  };

  render() {
    const {like, preview, caption} = this.props;
    return (
      <View style={styles.postDescription}>
        <Text style={styles.postLike}>
          {like ? `${like} Like` : `${preview} Preview`}
        </Text>
        {caption && <Text style={styles.postCaption}>{caption}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postDescription: {
    paddingLeft: 12,
    paddingVertical: 18,
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  },
  postLike: {
    fontFamily: Fonts.ProductSansRegular,
    fontSize: 12,
    color: 'black',
    marginBottom: 4,
  },
  postCaption: {
    fontFamily: Fonts.ProductSansRegular,
    fontSize: 12,
    color: 'black',
  },
});

export default PostInfo;
