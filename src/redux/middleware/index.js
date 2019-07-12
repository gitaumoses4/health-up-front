import { all } from 'redux-saga/effects';
import {watchFormSubmission} from '../../utils/Forms/middleware';
import forms from '../forms';

function * rootSaga() {
  yield all([
    ...forms.map(form => watchFormSubmission(form)())
  ]);
}

export default rootSaga;
