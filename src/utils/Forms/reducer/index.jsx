import {FORM_SUBMIT, FORM_SUBMIT_FAILURE, FORM_SUBMIT_SUCCESS} from '../actions';


const initialState = {
  forms: {

  }
};

const initialFormState = {
  data: {},
  errors: {},
  submitting: false,
  message: ''
};

const formReducer = (state = initialFormState, action, form) => {
  switch(action.type){
  case FORM_SUBMIT(form): {
    return {
      ...state,
      data: {},
      errors: {},
      submitting: true,
      message: ''
    };
  }
  case FORM_SUBMIT_SUCCESS(form): {
    return {
      ...state,
      data: action.data,
      errors: {},
      submitting: false,
      message: action.data.message
    };
  }
  case FORM_SUBMIT_FAILURE(form):{
    return {
      ...state,
      data: {},
      errors: action.errors || {},
      submitting: false,
      message: action.message
    };
  }
  default:
    return state;
  }
};

export default (forms) => (state = initialState, action) => {
  return forms.map(f => ( f.formConfig )).reduce((acc, form) => {
    return {
      ...acc,
      [form.name]: formReducer(state[form.name], action, form)
    };
  }, {});
};
