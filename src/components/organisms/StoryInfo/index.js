import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Avatar from '../../atoms/avatar';
import {Fonts} from '../../../utils/Fonts';
import Moment from '../../../utils/Moment';

export class StoryInfo extends Component {
  render() {
    const {owner, story} = this.props;
    return (
      <View style={styles.container}>
        <Avatar url={owner.pictureUrl} />
        <Text style={styles.avatarText}>{owner.username}</Text>
        <Text style={styles.avatarText}>
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
  avatarText: {
    color: '#ffffff',
    fontSize: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 4,
    marginLeft: 8,
    lineHeight: 20,
    fontFamily: Fonts.ProductSansRegular,
  },
});

export default StoryInfo;
