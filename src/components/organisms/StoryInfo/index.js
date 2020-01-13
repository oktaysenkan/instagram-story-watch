import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Avatar from '../../atoms/avatar';
import {Fonts} from '../../../utils/Fonts';
import Moment from '../../../utils/Moment';

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
        <Text style={styles.username}>{owner.username}</Text>
        <Text style={styles.time}>
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
  username: {
    color: '#ffffff',
    fontSize: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 5,
    marginLeft: 5,
    lineHeight: 22,
    fontFamily: Fonts.ProductSansRegular,
  },
  time: {
    color: '#EAEAEA',
    fontSize: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 5,
    marginLeft: 5,
    lineHeight: 22,
    fontFamily: Fonts.ProductSansMedium,
  },
});

export default StoryInfo;
