import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import ProgressBar from '../atoms/progressbar';
import Timer from '../../utils/Timer';
import Screen from '../../utils/Screen';
import Avatar from '../atoms/avatar';
import {Fonts} from '../../utils/Fonts';
import Moment from '../../utils/Moment';
import StoryInfo from '../organisms/StoryInfo';

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
      loading: true,
    };
  }

  componentDidMount() {
    const {currentStory} = this.state;
    if (currentStory.type === 'image') {
      this.nextStoryEventHandler = new Timer(() => {
        this.changeStory();
      }, 5000);
    }
  }

  componentWillUnmount() {
    this.nextStoryEventHandler = null;
  }

  onTapStart = event => {
    const {currentStory} = this.state;
    const {locationX} = event.nativeEvent;
    const previousStoryArea = (Screen.width / 100) * 15;
    const nextStoryArea = Screen.width - (Screen.width / 100) * 15;
    if (locationX > previousStoryArea && locationX < nextStoryArea) {
      console.log('Story paused');
      this.setState({
        paused: true,
      });
      if (currentStory.type === 'image') {
        this.nextStoryEventHandler.pause();
      }
    }
  };

  onTapEnd = event => {
    const {currentStory} = this.state;
    const {locationX} = event.nativeEvent;
    const previousStoryArea = (Screen.width / 100) * 15;
    const nextStoryArea = Screen.width - (Screen.width / 100) * 15;
    if (locationX < previousStoryArea) {
      this.changeStory('backward');
    } else if (locationX > nextStoryArea) {
      this.changeStory();
    } else {
      this.setState({
        paused: false,
      });
      if (currentStory.type === 'image') {
        this.nextStoryEventHandler.resume();
      }
    }
  };

  changeStory = (direction = 'forward') => {
    console.log('Story Changed');
    const {stories, currentIndex} = this.state;
    let newIndex = null;
    let currentStory = null;

    if (currentIndex === stories.length - 1) {
      this.allStoriesWatched();
      return;
    }

    if (direction === 'backward') {
      newIndex = currentIndex - 1;
      if (currentIndex === 0) {
        // Disable back on first story
        return;
      }
    } else {
      newIndex = currentIndex + 1;
    }

    currentStory = stories[newIndex];

    this.setState({
      currentIndex: newIndex,
      currentStory,
      loading: true,
    });

    if (currentStory.type === 'image') {
      this.nextStoryEventHandler.repeat();
    }
  };

  onVideoEnd = () => {
    console.log('Video end');
    this.changeStory();
  };

  onVideoLoad = event => {
    console.log('Video loaded');
    this.setState({loading: false});
  };

  onImageLoad = () => {
    console.log('Image loaded');
    this.setState({loading: false});
  };

  allStoriesWatched = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  render() {
    const {stories, currentStory, loading, owner} = this.state;
    return (
      <View
        style={styles.container}
        onStartShouldSetResponder={evt => true}
        onTouchStart={this.onTapStart}
        onTouchEnd={this.onTapEnd}>
        <StatusBar hidden={true} />

        {currentStory.type === 'image' ? (
          <Image
            style={styles.media}
            onLoadEnd={this.onImageLoad}
            source={{uri: currentStory.url}}
          />
        ) : (
          <Video
            style={styles.media}
            resizeMode="stretch"
            onLoad={this.onVideoLoad}
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

        <View style={styles.storyInfo}>
          <StoryInfo story={currentStory} owner={owner} />
        </View>

        {loading && (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator size="large" color="#444447" />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#444447',
    width: '100%',
    height: '100%',
    display: 'flex',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  statusBarWrapper: {
    display: 'flex',
    flexDirection: 'row',
    zIndex: 3,
  },
  storyInfo: {
    zIndex: 3,
  },
  media: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  loadingWrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#272727',
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StoryPage;
