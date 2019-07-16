import { REQUEST_RESOURCE_FAILURE, REQUEST_RESOURCE_SUCCESS, RESOURCE_REQUEST } from './resourceActions';
import resources from './index';


const initialState = {
  resources: {

  },
};

export const initialFormState = {
  data: {},
  errors: {},
  loading: false,
  message: '',
};

const createReducer = (state = initialFormState, action, resource) => {
  switch (action.type) {
  case RESOURCE_REQUEST(resource): {
    return {
      ...state,
      data: {},
      errors: {},
      loading: true,
      message: '',
    };
  }
  case REQUEST_RESOURCE_SUCCESS(resource): {
    return {
      ...state,
      data: action.data,
      errors: {},
      loading: false,
      message: action.data.message,
    };
  }
  case REQUEST_RESOURCE_FAILURE(resource): {
    return {
      ...state,
      data: {},
      errors: action.errors || {},
      loading: false,
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
      loading: true,
      message: '',
    };
  }
  case REQUEST_RESOURCE_SUCCESS(resource): {
    return {
      ...state,
      data: { ...state.data, ...action.data },
      errors: {},
      loading: false,
      message: action.data.message,
    };
  }
  case REQUEST_RESOURCE_FAILURE(resource): {
    return {
      ...state,
      errors: action.errors || {},
      loading: false,
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
      message: '',
    };
  }
  case REQUEST_RESOURCE_SUCCESS(resource): {
    return {
      ...state,
      data: { ...state.data, ...action.data },
      errors: {},
      loading: false,
      message: action.data.message,
    };
  }
  case REQUEST_RESOURCE_FAILURE(resource): {
    return {
      ...state,
      errors: action.errors || {},
      loading: false,
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
      loading: true,
      message: '',
    };
  }
  case REQUEST_RESOURCE_SUCCESS(resource): {
    return {
      ...state,
      errors: {},
      loading: false,
      message: action.data.message,
    };
  }
  case REQUEST_RESOURCE_FAILURE(resource): {
    return {
      ...state,
      errors: action.errors || {},
      loading: false,
      message: action.message,
    };
  }
  default:
    return state;
  }
};

const generateReducer = (state = initialFormState, action, resource) => {
  let func;
  switch (action.resourceType) {
  case 'read':
    func = readReducer;
    break;
  case 'update':
    func = updateReducer;
    break;
  case 'delete':
    func = deleteReducer;
    break;
  default:
    func = createReducer;
  }

  return func(state, action, resource);
};


export default (state = initialState, action) => Object.keys(resources).reduce((acc, resource) => ({
  ...acc,
  [resource]: generateReducer(state[resource], action, resource),
}), {});
