import {
  REQUEST_RESOURCE_FAILURE,
  REQUEST_RESOURCE_SUCCESS,
  RESOURCE_REQUEST,
} from './resourceActions';

export const initialListState = {
  data: [],
  errors: {},
  loading: false,
  submitting: false,
  message: '',
};

export const createListReducer = (state = initialListState, action, resource) => {
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
    const { resolveSingle } = action.request;
    return {
      ...state,
      data: [resolveSingle ? resolveSingle(action.data) : action.data, ...state.data],
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

export const updateListReducer = (state = initialListState, action, resource) => {
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
    const { resolveUpdate, resolveSingle } = action.request;
    const resolver = resolveUpdate
      ? state.data.findIndex(current => resolveUpdate(current, action.data)) : -1;

    const newData = [...state.data];
    if (resolver >= 0) newData[resolver] = resolveSingle ? resolveSingle(action.data) : action.data;
    return {
      ...state,
      data: newData,
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

export const readListReducer = (state = initialListState, action, resource) => {
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
    const { resolveList } = action.request;
    const list = resolveList ? resolveList(action.data) : action.data;
    return {
      ...state,
      data: list,
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

export const deleteListReducer = (state = initialListState, action, resource) => {
  switch (action.type) {
  case RESOURCE_REQUEST(resource): {
    const { resolveUpdate } = action.request;
    const resolver = resolveUpdate
      ? state.data.findIndex(current => resolveUpdate(current, action.data)) : -1;

    let newData = [...state.data];
    if (resolver >= 0) {
      newData = newData.splice(resolver, 1);
    }
    return {
      ...state,
      data: newData,
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
