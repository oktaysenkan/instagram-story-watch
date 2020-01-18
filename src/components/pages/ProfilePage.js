import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {PostList, ProfileInfo, LoadingWrapper} from 'components';

export class ProfilePage extends Component {
  constructor(props) {
    super(props);

    const {navigation} = this.props;
    const data = navigation.getParam('data', null);
    this.state = {
      profile: data,
      posts: [],
      stories: [],
      loading: true,
    };
  }

  getAllPosts = async () => {
    const {username} = this.state.profile;
    const response = await fetch(
      `http://192.168.2.113:3000/api/users/${username}/posts`,
    );
    const data = await response.json();
    console.log('Posts:', data.posts.length);
    this.setState({posts: data.posts, loading: false});
  };

  getAllStories = async () => {
    const {username} = this.state.profile;
    const response = await fetch(
      `http://192.168.2.113:3000/api/users/${username}/stories`,
    );
    const data = await response.json();
    console.log('Stories:', data.stories.length);
    this.setState({stories: data.stories});
  };

  async componentDidMount() {
    this.getAllPosts();
    this.getAllStories();
  }

  avatarOnPress = () => {
    const {navigation} = this.props;
    navigation.push('StoryPage', {
      data: {
        owner: this.state.profile,
        stories: this.state.stories,
      },
    });
  };

  render() {
    const {
      fullName,
      biography,
      category,
      pictureUrl,
      mediaCount,
      followerCount,
      followingCount,
    } = this.state.profile;
    const isHasStory = this.state.stories.length > 0 ? true : false;
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          <ProfileInfo
            fullName={fullName}
            biography={biography}
            category={category}
            pictureUrl={pictureUrl}
            mediaCount={mediaCount}
            followerCount={followerCount}
            followingCount={followingCount}
            isHasStory={isHasStory}
            avatarOnPress={this.avatarOnPress}
          />
          {this.state.loading ? (
            <LoadingWrapper />
          ) : (
            <PostList posts={this.state.posts} />
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1544E3',
    paddingTop: 20,
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default ProfilePage;
