export const FORM_SUBMIT = (form) => `${form.name}_FORM_SUBMIT`;

export const FORM_SUBMIT_SUCCESS = (form) => `${form.name}_FORM_SUBMIT_SUCCESS`;

export const FORM_SUBMIT_FAILURE = (form) => `${form.name}_FORM_SUBMIT_FAILURE`;


export const submitForm = (form) => (data, successCallback = _ => {}, errorCallback = _ => {}) => ({
  type: FORM_SUBMIT(form),
  data,
  successCallback,
  errorCallback
});

export const submitFormSuccess = (form) => (response) => ({
  type: FORM_SUBMIT_SUCCESS(form),
  data: response
});

export const submitFormFailure = (form) => ({errors, message}) => ({
  type: FORM_SUBMIT_FAILURE(form),
  errors,
  message
});
