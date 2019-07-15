import { combineReducers } from 'redux';
import resourceReducer from '../resources/resourceReducer';

const rootReducer = combineReducers({
  resources: resourceReducer,
});

export default rootReducer;
