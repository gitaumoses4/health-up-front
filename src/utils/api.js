import axios from 'axios';

class API {
  static setToken() {
    const token = localStorage.getItem('jwt-token');
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }
}

export default API;
