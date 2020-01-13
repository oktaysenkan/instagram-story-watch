import moment from 'moment';

class Moment {
  static getRelative(timestamp) {
    return moment.unix(timestamp).fromNow();
  }
}

export default Moment;
