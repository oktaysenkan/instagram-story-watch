import React, {Component} from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import Snackbar from '../organisms/snackbar';
import UsernameInput from '../atoms/inputs';
import ProgressBar from '../atoms/progressbar';

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
      `http://192.168.2.113:3000/api/users/${username}/stories`,
    );
    const data = await response.json();
    if (data.message) {
      this.setState({error: data.message});
      return;
    }
    this.setState({error: null});
    navigation.push('StoryPage', {
      data: data,
    });
  };

  render() {
    const {error} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.content}>
          <UsernameInput onSubmit={this.onSubmit} />
        </View>
        {error && <Snackbar>{error}</Snackbar>}
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
