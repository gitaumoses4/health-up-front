import _ from 'lodash';
import resources from './index';

export const RESOURCE_REQUEST = name => `${name}_RESOURCE_REQUEST`;

export const REQUEST_RESOURCE_SUCCESS = name => `${name}_REQUEST_RESOURCE_SUCCESS`;

export const REQUEST_RESOURCE_FAILURE = name => `${name}_REQUEST_RESOURCE_FAILURE`;

const getMethod = (type) => {
  switch (type.toLowerCase()) {
  case 'create':
    return 'post';
  case 'read':
    return 'get';
  case 'update':
    return 'put';
  case 'delete':
    return 'delete';
  default:
    return '';
  }
};

export const resourceRequest = (name, type, list) => (params = {}) => {
  const {
    data,
    successCallback = () => {},
    errorCallback = () => {},
    endpoint,
    ...otherProps
  } = params;
  return _.merge({}, (resources[name] || {}),
    {
      type: RESOURCE_REQUEST(name),
      data,
      resourceType: type,
      successCallback,
      errorCallback,
      endpoint,
      list,
      method: getMethod(type),
      ...otherProps,
    });
};

export const requestResourceSuccess = (name, type, list) => (response, request) => ({
  type: REQUEST_RESOURCE_SUCCESS(name),
  data: response,
  resourceType: type,
  request,
  list,
});

export const requestResourceFailure = (name, type, list) => (
  { errors, message }, request,
) => ({
  type: REQUEST_RESOURCE_FAILURE(name),
  resourceType: type,
  errors,
  list,
  message,
  request,
});
