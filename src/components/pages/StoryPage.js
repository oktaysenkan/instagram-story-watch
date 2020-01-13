import React, {Component} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Timer from '../../utils/Timer';
import Screen from '../../utils/Screen';
import StoryInfo from '../organisms/StoryInfo';
import LoadingScreen from '../organisms/LoadingScreen';
import StoryPlayer from '../organisms/StoryPlayer';
import ProgressBarList from '../organisms/ProgressBarList';

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
    this.previousStoryArea = (Screen.width / 100) * 15;
    this.nextStoryArea = Screen.width - (Screen.width / 100) * 15;
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
    if (locationX > this.previousStoryArea && locationX < this.nextStoryArea) {
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
    if (locationX < this.previousStoryArea) {
      this.changeStory('backward');
    } else if (locationX > this.nextStoryArea) {
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
    this.changeStory();
  };

  onVideoLoad = () => {
    this.setState({loading: false});
  };

  onImageLoad = () => {
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

        <StoryPlayer
          type={currentStory.type}
          onImageLoad={this.onImageLoad}
          onVideoLoad={this.onVideoLoad}
          paused={this.state.paused}
          onVideoEnd={this.onVideoEnd}
          source={{uri: currentStory.url}}
        />

        <ProgressBarList zIndex={3} data={stories} />
        <StoryInfo zIndex={3} story={currentStory} owner={owner} />
        <LoadingScreen zIndex={2} hidden={!loading} />
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
});

export default StoryPage;
