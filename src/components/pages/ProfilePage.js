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
      loadingNewPage: false,
    };
    this.endCursor = null;
  }

  getPosts = async () => {
    const {username} = this.state.profile;
    const cursor = this.endCursor ? `"${this.endCursor}"` : null;
    let url = encodeURI(
      `http://192.168.2.113:3000/api/users/${username}/posts?after=${cursor}`,
    );
    const response = await fetch(url);
    const data = await response.json();
    console.log('Posts:', data.posts.length);
    const posts = this.state.posts.concat(data.posts);
    this.endCursor = data.pageInfo.endCursor;
    this.setState({posts, loading: false, loadingNewPage: false});
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
    this.getPosts();
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

  onScroll = ({nativeEvent}) => {
    if (this.isNearToHalf(nativeEvent) && this.state.loadingNewPage === false) {
      this.currentPage++;
      this.setState({loadingNewPage: true});
      this.getPosts(this.currentPage);
    }
  };

  isNearToHalf = ({layoutMeasurement, contentOffset, contentSize}) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height / 2;
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
          contentContainerStyle={styles.scrollView}
          onScroll={this.onScroll}>
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
