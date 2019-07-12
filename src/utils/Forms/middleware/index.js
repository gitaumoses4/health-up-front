import {takeLatest, call, put} from 'redux-saga/effects';
import {FORM_SUBMIT, submitFormFailure, submitFormSuccess} from '../actions';
import FormService from '../services';
import errorHandler from '../../errorHandler';


export const submitFormSaga = (form) => function* ({ data, successCallback, errorCallback }) {
  try {
    const response = yield call(FormService.submitForm, form.endpoint, data , form.method);
    yield put(submitFormSuccess(form)(response.data));
    successCallback(response.data);
  }catch(error){
    yield put(submitFormFailure(form)(errorHandler(error)));
    errorCallback(error.response ? error.response.data: {});
  }
};

export const watchFormSubmission = ({ formConfig }) => function* () {
  yield takeLatest(FORM_SUBMIT(formConfig), submitFormSaga(formConfig));
};
