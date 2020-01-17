import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import AutoHeightImage from 'react-native-auto-height-image';
import {Screen, Fonts} from 'utils';

/**
 * Post Component
 * @augments {Component<Props, State>}
 */
export class Post extends Component {
  static propTypes = {
    source: PropTypes.string,
    like: PropTypes.number,
    preview: PropTypes.number,
    caption: PropTypes.string,
  };

  render() {
    const {source, like, preview, caption} = this.props;
    return (
      <View style={styles.post}>
        <AutoHeightImage width={Screen.width} source={{uri: source}} />
        <View style={styles.postDescription}>
          <Text style={styles.postLike}>
            {like ? `${like} Like` : `${preview} Preview`}
          </Text>
          <Text style={styles.postCaption}>{caption}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 360,
  },
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

export default Post;
