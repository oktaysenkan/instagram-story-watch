import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {PostList, ProfileInfo} from 'components';

export class ProfilePage extends Component {
  constructor(props) {
    super(props);

    const {navigation} = this.props;
    const data = navigation.getParam('data', null);
    this.state = {
      profile: data,
      posts: [],
      loading: true,
    };
  }

  getAllPosts = async () => {
    const {username} = this.state.profile;
    const response = await fetch(
      `http://192.168.2.113:3000/api/users/${username}/posts`,
    );
    const data = await response.json();
    console.log(data.posts.length);
    this.setState({posts: data.posts, loading: false});
  };

  async componentDidMount() {
    this.getAllPosts();
  }

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
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProfileInfo
            fullName={fullName}
            biography={biography}
            category={category}
            pictureUrl={pictureUrl}
            mediaCount={mediaCount}
            followerCount={followerCount}
            followingCount={followingCount}
          />
          {this.state.loading ? (
            <ActivityIndicator />
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
});

export default ProfilePage;
