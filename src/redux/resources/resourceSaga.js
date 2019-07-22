import { takeLatest, call, put } from 'redux-saga/effects';
import ResourceService from './resourceService';
import { requestResourceFailure, requestResourceSuccess, RESOURCE_REQUEST } from './resourceActions';
import errorHandler from '../../utils/errorHandler';
import resources from './index';


export const requestResource = name => function* ({
  type, list, resourceType, ...otherProps 
}) {
  try {
    const response = yield call(ResourceService.request, otherProps);
    yield put(requestResourceSuccess(name, resourceType, list)(response.data, otherProps));
    otherProps.successCallback(response.data);
  } catch (error) {
    yield put(requestResourceFailure(name, resourceType, list)(errorHandler(error), otherProps));
    otherProps.errorCallback(error.response || {});
  }
};

export const watchResourceSubmission = name => function* () {
  yield takeLatest(RESOURCE_REQUEST(name), requestResource(name));
};

export default Object.keys(resources).map(resource => watchResourceSubmission(resource)());
