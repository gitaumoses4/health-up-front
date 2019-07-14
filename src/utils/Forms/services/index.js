import axios from 'axios';

class FormService {

  static submitForm(endpoint, data, method = 'post'){
    return axios[method](endpoint, data);
  }
}

export default FormService;
