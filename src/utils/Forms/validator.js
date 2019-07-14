import _ from 'lodash';

const rules = {
  required: {
    valid: ({value, name, values, target}) => !!value,
    message: ({value, name, values, target}) => `${_.startCase(name)} is required`
  },
  email: {
    valid: ({value}) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
    message: () => 'Please enter a valid email'
  }
};

class Validator {
  constructor(form, moreRules){
    this.form = form;
    this.rules = _.merge(this.rules, rules, moreRules);
  }

  validate = (name, callback = _ => {}, target) => {
    const { state: { rules, values, messages } } = this.form;

    const fieldRules = rules[name] || [];

    const fieldMessages = _.merge({}, fieldRules.reduce((acc, rule) => {
      return {
        ...acc,
        [rule]: this.rules[rule] && this.rules[rule].message
      };
    }, {}), messages[name] );

    let error = null;
    for(let i=0;i<fieldRules.length;i++){
      if(!this.rules[fieldRules[i]].valid({value: values[name], name, values, target})){
        const message = fieldMessages[fieldRules[i]];
        let m = message;
        if( message.constructor === Function){
          m = message({value: values[name], name, values, target});
        }

        error = m;
        this.setFulfilled(name, fieldRules[i], false);
        break;
      }else{
        this.setFulfilled(name, fieldRules[i], true);
      }
    }
    this.setError(name, error, () => {
      this.checkFulfillment(callback);
    });
  };


  setFulfilled = (name, rule, value) => {
    this.form.setState((state) => ({
      fulfilled: this.fulfilHelper(state, name, rule, value)
    }));
  };

  fulfilHelper = ({ fulfilled }, name, rule, value) => {
    return {
      ...fulfilled,
      [name]: {
        ...fulfilled[name],
        [rule]: !!value
      }
    };
  };

  checkFulfillment = (callback = _ => {}) => {
    const { fulfilled } = this.form.state;
    let valid = Object.keys(fulfilled)
      .reduce((acc, curName) => (
        acc && Object.keys(fulfilled[curName]).reduce((accRules, curRule) => (
          accRules && fulfilled[curName][curRule]
        ), true)
      ), true);

    this.form.setState({
      valid
    }, callback);
  };

  setError(name, error, callback = _ => {}){
    this.form.setState(({errors}) => {
      return {
        errors: {...errors, [name]: error}
      };
    }, callback);
  }

  clearErrors(name, fulfil = false, callback = _ => {}){
    this.form.setState(({errors,fulfilled}) => {
      if( name ){
        return {
          errors: { ...errors, [name]: undefined},
          fulfilled: {
            ...fulfilled,
            [name]: Object.keys(fulfilled[name]).reduce((acc, cur) => ({
              ...acc,
              [cur]: fulfil
            }), {})
          }
        };
      }else {
        return {
          errors: {},
          fulfilled: Object.keys(fulfilled)
            .reduce((acc, curName) => ({
              ...acc,
              [curName]: Object.keys(fulfilled[curName])
                .reduce((accRules, curRule) => ({
                  ...accRules,
                  [curRule]: fulfil
                }), {})
            }), {})
        };
      }
    }, callback);
  }
}

export default Validator;
