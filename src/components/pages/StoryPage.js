import React, {Component} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {Timer, Screen} from 'utils';
// eslint-disable-next-line prettier/prettier
import {StoryInfo, LoadingScreen, StoryPlayer, ProgressBarList} from 'components';

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
      duration: null,
      currentBarValue: 0,
    };
    this.previousStoryArea = (Screen.width / 100) * 20;
    this.nextStoryArea = Screen.width - (Screen.width / 100) * 20;
  }

  onImageEnd = () => {
    const {currentStory} = this.state;
    if (currentStory.type === 'image') {
      this.changeStory();
    }
  };

  componentWillUnmount() {
    this.storyEndHandler.clear();
    this.storyEndHandler = null;
  }

  onTapStart = event => {
    const {currentStory, loading} = this.state;
    const {locationX} = event.nativeEvent;
    if (locationX > this.previousStoryArea && locationX < this.nextStoryArea) {
      if (loading) {
        return;
      }
      this.lastTapArea = 'middle';
      console.log('Story paused');
      this.setState({
        paused: true,
      });
      if (currentStory.type === 'image') {
        this.storyEndHandler.pause();
      }
    }
  };

  onTapEnd = event => {
    const {currentStory, loading} = this.state;
    const {locationX} = event.nativeEvent;

    if (this.lastTapArea === 'middle') {
      if (loading) {
        return;
      }
      this.setState({
        paused: false,
      });
      if (currentStory.type === 'image') {
        this.storyEndHandler.resume();
      }
      this.lastTapArea = null;
    } else if (locationX < this.previousStoryArea) {
      this.changeStory('backward');
    } else if (locationX > this.nextStoryArea) {
      this.changeStory();
    }
  };

  changeStory = (direction = 'forward') => {
    const {stories, currentIndex} = this.state;
    let newIndex = null;
    let currentStory = null;
    if (currentIndex === stories.length - 1 && direction === 'forward') {
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
      currentBarValue: 0,
    });
  };

  onVideoEnd = () => {
    this.changeStory();
  };

  onStoryLoad = duration => {
    console.log('story süresi', duration);
    if (!this.storyEndHandler) {
      this.storyEndHandler = new Timer(this.onImageEnd, 7000);
    } else {
      this.storyEndHandler.repeat();
    }

    this.setState({
      duration: duration,
    });
  };

  onVideoLoad = data => {
    this.onStoryLoad(data.duration * 1000);
  };

  onVideoReady = () => {
    this.setState({loading: false});
  };

  onImageLoad = () => {
    this.setState({loading: false});
    this.onStoryLoad(7000);
  };

  allStoriesWatched = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  render() {
    const {stories, currentStory, loading, owner, currentIndex} = this.state;
    const finishedBars = currentIndex;
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
          onVideoReady={this.onVideoReady}
          source={{uri: currentStory.url}}
        />
        <ProgressBarList
          zIndex={3}
          totalBars={stories.length}
          finishedBars={finishedBars}
          loading={this.state.loading}
          paused={this.state.paused}
          duration={this.state.duration}
        />
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
