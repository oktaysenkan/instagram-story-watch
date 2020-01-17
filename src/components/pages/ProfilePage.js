import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import Avatar from 'components/atoms/Avatar';
import {Fonts, Screen} from 'utils';
import ProfileInfo from 'components/organisms/ProfileInfo';
import Post from 'components/organisms/Post';

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
            <View style={styles.posts}>
              {this.state.posts.map(post => {
                return (
                  <Post
                    dimensions={post.dimensions}
                    caption={post.caption}
                    like={post.like}
                    preview={post.preview}
                    source={post.displayUrl}
                    videoUrl={post.videoUrl}
                  />
                );
              })}
            </View>
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
  posts: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },
  post: {
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 360,
  },
  postDescription: {
    paddingLeft: 12,
    paddingVertical: 18,
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  },
  postLike: {
    fontFamily: Fonts.ProductSansRegular,
    fontSize: 12,
    color: 'black',
    marginBottom: 4,
  },
  postCaption: {
    fontFamily: Fonts.ProductSansRegular,
    fontSize: 12,
    color: 'black',
  },
});

export default ProfilePage;
