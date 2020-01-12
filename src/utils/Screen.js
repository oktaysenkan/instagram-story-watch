import {Dimensions} from 'react-native';

class Screen {
  static get height() {
    return Dimensions.get('window').height;
  }

  static get width() {
    return Dimensions.get('window').width;
  }
}

export default Screen;
