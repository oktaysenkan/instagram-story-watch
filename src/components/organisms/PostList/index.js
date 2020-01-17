import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Post from 'components/organisms/Post';

/**
 * PostList Component
 * @augments {Component<Props, State>}
 */
export class PostList extends Component {
  static propTypes = {
    posts: PropTypes.array,
  };

  render() {
    const {posts} = this.props;
    return (
      <View style={styles.posts}>
        {posts.map(post => {
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
    );
  }
}

const styles = StyleSheet.create({
  posts: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },
});

export default PostList;
