import moment from 'moment';

class Tools {
  static formatDate(date) {
    if (date) {
      return moment(date).format('YYYY-MM-DD');
    }
  }

  static s(string) {
    return string || '--';
  }
}

export default Tools;
