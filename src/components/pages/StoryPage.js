import React, {Component} from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import ProgressBar from '../atoms/progressbar';

export class StoryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: {},
      stories: [],
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    const data = navigation.getParam('data', null);
    this.setState({
      owner: data.owner,
      stories: data.stories,
    });
    console.log(data.stories);
  }

  render() {
    const {stories} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.statusBar}>
          {stories.map(story => {
            return <ProgressBar />;
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 21,
    paddingHorizontal: 10,
    backgroundColor: '#1544E3',
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  statusBar: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default StoryPage;
