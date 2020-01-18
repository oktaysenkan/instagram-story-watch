import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar} from 'components';
import {Fonts} from 'utils';

/**
 * ProfileInfo Component
 * @augments {Component<Props, State>}
 */
export class ProfileInfo extends Component {
  static propTypes = {
    pictureUrl: PropTypes.string,
    fullName: PropTypes.string,
    category: PropTypes.string,
    biography: PropTypes.string,
    mediaCount: PropTypes.number,
    followerCount: PropTypes.number,
    followingCount: PropTypes.number,
    isHasStory: PropTypes.bool,
    avatarOnPress: PropTypes.func,
  };

  render() {
    const {
      pictureUrl,
      fullName,
      category,
      biography,
      mediaCount,
      followerCount,
      followingCount,
      isHasStory,
      avatarOnPress,
    } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={avatarOnPress}>
          <Avatar
            height={60}
            width={60}
            borderRadius={60}
            url={pictureUrl}
            isHasStory={isHasStory}
          />
        </TouchableOpacity>

        <Text style={styles.fullName}>{fullName}</Text>
        <Text style={styles.accountType}>{category}</Text>
        <Text style={styles.biography}>{biography}</Text>

        <View style={styles.infoWrapper}>
          <View style={styles.info}>
            <Text style={styles.infoValue}>{mediaCount}</Text>
            <Text style={styles.infoField}>Posts</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoValue}>{followerCount}</Text>
            <Text style={styles.infoField}>Followers</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoValue}>{followingCount}</Text>
            <Text style={styles.infoField}>Following</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullName: {
    marginTop: 15,
    fontFamily: Fonts.ProductSansBold,
    fontSize: 16,
    color: 'white',
  },
  accountType: {
    marginTop: 5,
    fontFamily: Fonts.ProductSansRegular,
    fontSize: 12,
    color: 'white',
  },
  biography: {
    marginTop: 5,
    fontFamily: Fonts.ProductSansRegular,
    fontSize: 12,
    color: 'white',
    width: 250,
    textAlign: 'center',
  },
  infoWrapper: {
    marginTop: 18,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
  },
  infoField: {
    fontFamily: Fonts.ProductSansRegular,
    fontSize: 12,
    color: 'white',
  },
  infoValue: {
    fontFamily: Fonts.ProductSansBold,
    fontSize: 12,
    color: 'white',
  },
});

export default ProfileInfo;
