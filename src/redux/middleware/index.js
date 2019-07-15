import { all } from 'redux-saga/effects';
import resourceSaga from '../resources/resourceSaga';

function* rootSaga() {
  yield all([
    ...resourceSaga,
  ]);
}

export default rootSaga;
