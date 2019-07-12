import {combineReducers} from 'redux';
import formsReducer from '../../utils/Forms/reducer';
import forms from '../forms';

const rootReducer = combineReducers({
  forms: formsReducer(forms)
});

export default rootReducer;
