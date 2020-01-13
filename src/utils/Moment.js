import moment from 'moment';

class Moment {
  static getRelative(timestamp) {
    config();
    return moment.unix(timestamp).fromNow();
  }
}

const config = () => {
  moment.locale('en', {
    relativeTime: {
      past: '%s',
      s: 's',
      ss: '%ss',
      m: '1m',
      mm: '%dm',
      h: '1h',
      hh: '%dh',
      d: '1d',
    },
  });
};

export default Moment;
