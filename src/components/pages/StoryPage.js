import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import ProgressBar from '../atoms/progressbar';
import Timer from '../../utils/Timer';

export class StoryPage extends Component {
  constructor(props) {
    super(props);

    const {navigation} = this.props;
    const data = navigation.getParam('data', null);
    this.state = {
      owner: data.owner,
      stories: data.stories,
      currentIndex: 0,
      currentStory: data.stories[0],
      paused: false,
    };
  }

  componentDidMount() {
    this.nextStoryEventHandler = new Timer(() => {
      this.changeStory();
    }, 5000);
  }

  componentWillUnmount() {
    console.log('unmount');
    this.nextStoryEventHandler = null;
  }

  onTapStart = event => {
    const {locationX} = event.nativeEvent;
    if (locationX > 50 && locationX < 360) {
      this.setState({
        paused: true,
      });
      this.nextStoryEventHandler.pause();
    }
  };

  onTapEnd = event => {
    const {locationX} = event.nativeEvent;
    if (locationX < 50) {
      this.changeStory('backward');
    } else if (locationX > 360) {
      this.changeStory();
    } else {
      this.setState({
        paused: false,
      });
      this.nextStoryEventHandler.resume();
    }
  };

  changeStory = (direction = 'forward') => {
    const {stories, currentIndex} = this.state;
    let newIndex = null;
    let currentStory = null;

    if (currentIndex === stories.length - 1) {
      this.allStoriesWatched();
      return;
    }

    if (direction === 'forward') {
      newIndex = currentIndex + 1;
    } else {
      newIndex = currentIndex - 1;
      if (currentIndex === 0) {
        return;
      }
    }

    currentStory = stories[newIndex];

    this.setState({
      currentIndex: newIndex,
      currentStory,
    });

    if (currentStory.type === 'image') {
      this.nextStoryEventHandler.repeat();
    }
  };

  onVideoEnd = () => {
    this.changeStory();
  };

  allStoriesWatched = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  render() {
    const {stories, currentStory} = this.state;
    return (
      <View
        style={styles.container}
        onStartShouldSetResponder={evt => true}
        onTouchStart={this.onTapStart}
        onTouchEnd={this.onTapEnd}>
        <StatusBar hidden={true} />

        {currentStory.type === 'image' ? (
          <Image style={styles.media} source={{uri: currentStory.url}} />
        ) : (
          <Video
            style={styles.media}
            resizeMode="stretch"
            paused={this.state.paused}
            onEnd={this.onVideoEnd}
            source={{uri: currentStory.url}}
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
