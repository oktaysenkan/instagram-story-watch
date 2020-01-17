import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Avatar from 'components/atoms/Avatar';
import {Fonts} from 'utils';

export class ProfilePage extends Component {
  constructor(props) {
    super(props);

    const {navigation} = this.props;
    const data = navigation.getParam('data', null);
    this.state = {
      owner: data.owner,
    };
    console.log(data);
  }

  render() {
    console.log('test');
    const url =
      'https://instagram.fist7-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/81108661_163055164924422_5272443728015176796_n.jpg?_nc_ht=instagram.fist7-2.fna.fbcdn.net&_nc_cat=1&_nc_ohc=O0mH1WQYrR4AX_HE6AQ&oh=6cafe64772b29ff5286106784dc7b690&oe=5E9E011D&ig_cache_key=MjIxODM5ODI2NTQxODYxNTIzNA%3D%3D.2';
    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <Avatar height={60} width={60} borderRadius={60} url={url} />
          <Text style={styles.fullName}>Salvador Dali</Text>
          <Text style={styles.accountType}>Artist</Text>
          <Text style={styles.biography}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dictum
            justo eget leo porta, vitae sollicitudin nulla lacinia.
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
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
});

export default ProfilePage;
