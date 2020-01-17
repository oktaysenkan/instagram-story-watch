import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import Avatar from 'components/atoms/Avatar';
import {Fonts, Screen} from 'utils';
import ProfileInfo from 'components/organisms/ProfileInfo';


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
          <View style={styles.posts}>
            <View style={styles.post}>
              <AutoHeightImage
                width={Screen.width}
                source={{
                  uri:
                    'https://instagram.fist7-2.fna.fbcdn.net/v/t51.2885-19/75654062_2749186051810079_3823034159211741184_n.jpg?_nc_ht=instagram.fist7-2.fna.fbcdn.net&_nc_ohc=zZfNApvWaAUAX-ked1y&oh=fad631ad9789d1b0cfd390d1797936e0&oe=5EB7F373',
                }}
              />
              <View style={styles.postDescription}>
                <Text style={styles.postLike}>23,145 Like</Text>
                <Text style={styles.postCaption}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
              </View>
            </View>
          </View>
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
