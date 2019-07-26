import { REQUEST_RESOURCE_FAILURE, REQUEST_RESOURCE_SUCCESS, RESOURCE_REQUEST } from './resourceActions';
import resources from './index';
import {
  createListReducer,
  deleteListReducer, initialListState,
  readListReducer,
  updateListReducer,
} from './listReducer';


const initialState = {
  resources: {

  },
};

export const initialFormState = {
  data: {},
  errors: {},
  loading: false,
  submitting: false,
  message: '',
};

const createReducer = (state = initialFormState, action, resource) => {
  switch (action.type) {
  case RESOURCE_REQUEST(resource): {
    return {
      ...state,
      data: {},
      errors: {},
      loading: false,
      submitting: true,
      message: '',
    };
  }
  case REQUEST_RESOURCE_SUCCESS(resource): {
    return {
      ...state,
      data: action.data,
      errors: {},
      loading: false,
      submitting: false,
      message: action.data.message,
    };
  }
  case REQUEST_RESOURCE_FAILURE(resource): {
    return {
      ...state,
      data: {},
      errors: action.errors || {},
      loading: false,
      submitting: false,
      message: action.message,
    };
  }
  default:
    return state;
  }
};

const updateReducer = (state = initialFormState, action, resource) => {
  switch (action.type) {
  case RESOURCE_REQUEST(resource): {
    return {
      ...state,
      errors: {},
      loading: false,
      submitting: true,
      message: '',
    };
  }
  case REQUEST_RESOURCE_SUCCESS(resource): {
    return {
      ...state,
      data: { ...state.data, ...action.data },
      errors: {},
      loading: false,
      submitting: false,
      message: action.data.message,
    };
  }
  case REQUEST_RESOURCE_FAILURE(resource): {
    return {
      ...state,
      errors: action.errors || {},
      loading: false,
      submitting: false,
      message: action.message,
    };
  }
  default:
    return state;
  }
};

const readReducer = (state = initialFormState, action, resource) => {
  switch (action.type) {
  case RESOURCE_REQUEST(resource): {
    return {
      ...state,
      errors: {},
      loading: true,
      submitting: false,
      message: '',
    };
  }
  case REQUEST_RESOURCE_SUCCESS(resource): {
    return {
      ...state,
      data: { ...state.data, ...action.data },
      errors: {},
      loading: false,
      submitting: false,
      message: action.data.message,
    };
  }
  case REQUEST_RESOURCE_FAILURE(resource): {
    return {
      ...state,
      errors: action.errors || {},
      loading: false,
      submitting: false,
      message: action.message,
    };
  }
  default:
    return state;
  }
};

const deleteReducer = (state = initialFormState, action, resource) => {
  switch (action.type) {
  case RESOURCE_REQUEST(resource): {
    return {
      ...state,
      data: {},
      errors: {},
      loading: false,
      submitting: true,
      message: '',
    };
  }
  case REQUEST_RESOURCE_SUCCESS(resource): {
    return {
      ...state,
      errors: {},
      loading: false,
      submitting: false,
      message: action.data.message,
    };
  }
  case REQUEST_RESOURCE_FAILURE(resource): {
    return {
      ...state,
      errors: action.errors || {},
      loading: false,
      submitting: false,
      message: action.message,
    };
  }
  default:
    return state;
  }
};

const generateReducer = (state, action, resource) => {
  const list = action.list || resources[resource].list;
  let func;
  switch (action.resourceType) {
  case 'read':
    func = list ? readListReducer : readReducer;
    break;
  case 'update':
    func = list ? updateListReducer : updateReducer;
    break;
  case 'delete':
    func = list ? deleteListReducer : deleteReducer;
    break;
  default:
    func = list ? createListReducer : createReducer;
  }

  return func(state || (list ? initialListState : initialFormState), action, resource);
};


export default (state = initialState, action) => Object.keys(resources).reduce((acc, resource) => ({
  ...acc,
  [resource]: generateReducer(state[resource], action, resource),
}), {});
