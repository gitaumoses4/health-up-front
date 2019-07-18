import moment from 'moment';

class Tools {
  static formatDate(date) {
    if (date) {
      return moment(date).format('YYYY-MM-DD');
    }
  }
}

export default Tools;
