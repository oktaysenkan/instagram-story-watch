import React, {Component} from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import Avatar from 'components/atoms/Avatar';
import {Fonts} from 'utils';

export class ProfilePage extends Component {
  constructor(props) {
    super(props);

    const {navigation} = this.props;
    const data = navigation.getParam('data', null);
    this.state = {
      profile: data,
    };
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
        <View style={styles.profile}>
          <Avatar height={60} width={60} borderRadius={60} url={pictureUrl} />
          <Text style={styles.fullName}>{fullName}</Text>
          <Text style={styles.accountType}>{category}</Text>
          <Text style={styles.biography}>{biography}</Text>

          <View style={styles.profileInfo}>
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
        </View>
        <View style={styles.posts}>
          <Text>posts</Text>
        </View>
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
  profile: {
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
  posts: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default ProfilePage;
