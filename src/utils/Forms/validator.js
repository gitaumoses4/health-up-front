import _ from 'lodash';

const rules = {
  required: {
    valid: (value, name, values) => !!value,
    message: (value, name, values) => `${_.startCase(name)} is required`
  }
};

class Validator {
  constructor(form){
    this.form = form;
    this.rules = {...rules};
  }

  addRule = (name, validator) => {
    this.rules[name] = validator;
  };

  validate = (name, callback = _ => {}) => {
    const { state: { rules, values, messages } } = this.form;

    const fieldRules = rules[name] || [];

    const fieldMessages = _.merge({},fieldRules.reduce((acc, rule) => {
      return {
        ...acc,
        [rule]: this.rules[rule] && this.rules[rule].message
      };
    }, {}), messages);

    let error = null;
    for(let i=0;i<fieldRules.length;i++){
      if(!this.rules[fieldRules[i]].valid(values[name], name, values)){
        const message = fieldMessages[fieldRules[i]];
        let m = message;
        if( message.constructor === Function){
          m = message(values[name], name, values);
        }

        error = m;
        break;
      }
    }

    this.setError(name, error, callback);
  }

  setError(name, error, callback = _ => {}){
    this.form.setState(({errors}) => {
      return {errors: {...errors, [name]: error}};
    }, callback);
  }

  clearErrors(name, callback = _ => {}){
    this.form.setState(({errors}) => {
      if( name ){
        return { errors: { ...errors, [name]: undefined}};
      }else {
        return { errors: {}};
      }
    }, callback);
  }
}

export default Validator;
