import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainPage from './src/components/pages/MainPage';
import StoryPage from './src/components/pages/StoryPage';
import ProfilePage from './src/components/pages/ProfilePage';

const MainNavigator = createStackNavigator(
  {
    Home: {screen: MainPage},
    StoryPage: {screen: StoryPage},
    ProfilePage: {screen: ProfilePage},
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

const App = createAppContainer(MainNavigator);

export default App;
