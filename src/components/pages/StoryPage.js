import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  Button
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

  onPress = () => {
    const {paused} = this.state;
    if (!paused) {
      this.nextStoryEventHandler.pause();
      this.setState({paused: true});
    } else {
      this.nextStoryEventHandler.resume();
      this.setState({paused: false});
    }
  };

  changeStory = () => {
    const {stories, currentIndex} = this.state;
    if (currentIndex === stories.length - 1) {
      this.allStoriesWatched();
      return;
    }
    const currentStory = stories[currentIndex + 1];
    this.setState({
      currentIndex: currentIndex + 1,
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
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {currentStory.type === 'image' ? (
          <Image style={styles.media} source={{uri: currentStory.url}} />
        ) : (
          <Video
            style={styles.media}
            resizeMode="stretch"
            onEnd={this.onVideoEnd}
            source={{uri: currentStory.url}}
          />
        )}
        <View style={styles.statusBarWrapper}>
          {stories.map((story, i) => {
            return <ProgressBar />;
          })}
        </View>

        <TouchableOpacity onPress={this.onPress}>
          <Text>PAUSE</Text>
        </TouchableOpacity>
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
