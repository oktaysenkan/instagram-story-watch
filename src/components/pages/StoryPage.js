import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';

import ProgressBar from '../atoms/progressbar';

export class StoryPage extends Component {
  constructor(props) {
    super(props);

    const {navigation} = this.props;
    const data = navigation.getParam('data', null);
    this.state = {
      owner: data.owner,
      stories: data.stories,
      currentIndex: 0,
      currentStory: data.stories[1],
    };
  }

  render() {
    const {stories, currentStory} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {currentStory.type === 'image' ? (
          <Image style={styles.media} source={{uri: currentStory.url}} />
        ) : (
          <Video
            resizeMode="stretch"
            source={{uri: currentStory.url}}
            onBuffer={this.onBuffer}
            onError={this.videoError}
            style={styles.media}
          />
        )}
        <View style={styles.statusBarWrapper}>
          {stories.map((story, i) => {
            return <ProgressBar />;
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1544E3',
    width: '100%',
    height: '100%',
    display: 'flex',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  statusBarWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  media: {
    paddingTop: 10,
    paddingHorizontal: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
  },
});

export default StoryPage;
