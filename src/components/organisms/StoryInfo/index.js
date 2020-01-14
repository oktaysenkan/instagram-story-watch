import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Avatar} from 'components';
import {Fonts, Moment} from 'utils';

export class StoryInfo extends Component {
  render() {
    const {owner, story, zIndex} = this.props;
    const containerStyle = {
      ...styles.container,
      zIndex,
    };
    return (
      <View style={containerStyle}>
        <View style={styles.avatarWrapper}>
          <Avatar url={owner.pictureUrl} />
        </View>
        <Text style={styles.text}>{owner.username}</Text>
        <Text style={{...styles.text, ...styles.gray}}>
          {Moment.getRelative(story.publishingDate)}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  avatarWrapper: {
    marginRight: 10,
  },
  text: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 5,
    marginRight: 5,
    fontFamily: Fonts.ProductSansRegular,
  },
  gray: {
    color: '#EAEAEA',
  },
});

export default StoryInfo;
