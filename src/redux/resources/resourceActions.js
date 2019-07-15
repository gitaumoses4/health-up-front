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
  }
  return '';
};

export const resourceRequest = (name, type) => (params = {}) => {
  const {
    data,
    successCallback = (_) => {},
    errorCallback = (_) => {},
    endpoint,
    method, ...otherProps
  } = params;
  return _.merge({}, (resources[name] || {}),
    {
      type: RESOURCE_REQUEST(name),
      data,
      resourceType: type,
      successCallback,
      errorCallback,
      endpoint,
      method: getMethod(type),
      ...otherProps,
    });
};

export const requestResourceSuccess = (name, type) => (response, request) => ({
  type: REQUEST_RESOURCE_SUCCESS(name),
  data: response,
  resourceType: type,
  request,
});

export const requestResourceFailure = (name, type) => ({ errors, message }, request) => ({
  type: REQUEST_RESOURCE_FAILURE(name),
  resourceType: type,
  errors,
  message,
  request,
});
