import React, {Component} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {Snackbar, TextInput} from 'components';

export class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  onSubmit = async username => {
    const {navigation} = this.props;
    const response = await fetch(
      `http://192.168.2.113:3000/api/users/${username}/profile`,
    );
    const data = await response.json();
    if (data.message) {
      this.setState({error: data.message});
      return;
    }
    if (data.isPrivate) {
      this.setState({error: 'This account is private!'});
      return;
    }
    this.setState({error: null});
    navigation.push('ProfilePage', {
      data: data,
    });
  };

  render() {
    const {error} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.content}>
          <TextInput onSubmit={this.onSubmit} />
        </View>
        <Snackbar message={error} duration={4000} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1544E3',
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  content: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  snackbar: {
    backgroundColor: 'blue',
  },
});

export default MainPage;
