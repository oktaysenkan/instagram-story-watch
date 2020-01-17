import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import AutoHeightImage from 'react-native-auto-height-image';
import {Screen, Fonts} from 'utils';
import Video from 'react-native-video';
import {PostInfo} from 'components';

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
    videoUrl: PropTypes.string,
    dimesions: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      paused: true,
    };
  }

  videoTouch = () => {
    this.setState({paused: !this.state.paused});
  };

  calculateVideoHeight = dimensions => {
    const {width, height} = dimensions;
    if (width > height) {
      const percent = width / height;
      return {
        height: Screen.width / percent,
      };
    } else {
      return {
        height: Screen.width,
      };
    }
  };

  render() {
    const {source, like, preview, caption, videoUrl, dimensions} = this.props;
    const videoStyle = {
      ...styles.postVideo,
      ...this.calculateVideoHeight(dimensions),
    };
    return (
      <View style={styles.post}>
        {videoUrl ? (
          <TouchableOpacity onPress={this.videoTouch}>
            <Video
              style={videoStyle}
              paused={this.state.paused}
              source={{uri: videoUrl}}
              onVideoLoadStart={this.videoLoad}
              resizeMode={'cover'}
              poster={source}
              posterResizeMode={'cover'}
              repeat={true}
            />
          </TouchableOpacity>
        ) : (
          <AutoHeightImage width={Screen.width} source={{uri: source}} />
        )}
        <PostInfo caption={caption} like={like} preview={preview} />
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
  postVideo: {
    width: '100%',
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
