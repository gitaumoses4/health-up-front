import * as axios from 'axios';
import queryString from 'query-string';

const configureParams = (endpoint, params) => {
  const regex = /:[A-Z a-z]+/g;

  let generated = endpoint;
  const found = endpoint.match(regex);
  if (found) {
    found.forEach((value) => {
      const key = params[value.substring(1)];
      if (key) {
        generated = generated.replace(value, key);
      }
    });
  }
  return generated;
};

const configureEndpoint = ({ query, params = {}, endpoint }) => {
  let createdEndpoint = endpoint;

  createdEndpoint = configureParams(createdEndpoint, params);

  if (query) {
    createdEndpoint = `${createdEndpoint}?${queryString.stringify(query)}`;
  }

  return createdEndpoint;
};

class ResourceService {
  static request({
    data, method, endpoint, query, params,
  }) {
    return axios[method](configureEndpoint({ endpoint, query, params }), data);
  }
}

export default ResourceService;
