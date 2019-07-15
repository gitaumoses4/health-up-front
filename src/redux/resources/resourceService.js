import * as axios from 'axios';

class ResourceService {
  static request({ data, method, endpoint }) {
    return axios[method](endpoint, data);
  }
}

export default ResourceService;
