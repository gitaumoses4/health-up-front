import * as axios from 'axios';
import queryString from 'query-string';

class ResourceService {
  static request({
    data, method, endpoint, query, 
  }) {
    const createdEndpoint = query ? `${endpoint}?${queryString.stringify(query)}` : endpoint;
    return axios[method](createdEndpoint, data);
  }
}

export default ResourceService;
