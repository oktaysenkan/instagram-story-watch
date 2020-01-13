import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Video from 'react-native-video';

export class StoryPlayer extends Component {
  deneme = a => {
    console.log(a);
  };

  render() {
    const {
      type,
      onVideoLoad,
      onVideoEnd,
      source,
      onImageLoad,
      paused,
    } = this.props;
    if (type === 'image') {
      return (
        <Image style={styles.media} onLoadEnd={onImageLoad} source={source} />
      );
    } else if (type === 'video') {
      return (
        <Video
          style={styles.media}
          resizeMode="stretch"
          onLoad={onVideoLoad}
          paused={paused}
          onEnd={onVideoEnd}
          source={source}
          onVideoProgress={this.deneme}
        />
      );
    } else {
      return (
        <View>
          <Text>This media type is not supported!</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  media: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});

export default StoryPlayer;
