import _ from 'lodash';

const defaultRules = {
  required: {
    valid: ({
      value, name, values, target,
    }) => {
      if (value) {
        if (value.constructor === Object) {
          return value !== {};
        } if (value.constructor === Array) {
          return value.length;
        }
        return true;
      }
      return false;
    },
    message: ({
      value, name, values, target,
    }) => `${_.startCase(name)} is required`,
  },
  email: {
    valid: ({ value }) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
    message: () => 'Please enter a valid email',
  },
};

class Validator {
  constructor(form, moreRules) {
    this.form = form;
    this.rules = _.merge(this.rules, defaultRules, moreRules);
  }

  validateAll = async () => {
    const { rules } = this.form.state;
    return this.validate(Object.keys(rules));
  };

  validate = async (fields, target) => {
    let names = fields;
    if ((typeof fields) === 'string') {
      names = [fields];
    }
    await Promise.all(names.map(async (name) => {
      const { state: { rules, values, messages } } = this.form;

      const fieldRules = rules[name] || [];

      const fieldMessages = _.merge({}, fieldRules.reduce((acc, rule) => ({
        ...acc,
        [rule]: this.rules[rule] && this.rules[rule].message,
      }), {}), messages[name]);

      let error = null;
      for (let i = 0; i < fieldRules.length; i += 1) {
        if (!this.rules[fieldRules[i]].valid({
          value: values[name], name, values, target,
        })) {
          const message = fieldMessages[fieldRules[i]];
          let m = message;
          if (message.constructor === Function) {
            m = message({
              value: values[name], name, values, target,
            });
          }

          error = m;
          await this.setFulfilled(name, fieldRules[i], false);
          break;
        } else {
          await this.setFulfilled(name, fieldRules[i], true);
        }
      }
      await this.setError(name, error);
      await this.checkFulfillment();
    }));
  };


  setFulfilled = (name, rule, value) => new Promise((resolve) => {
    this.form.setState(state => ({
      fulfilled: this.fulfilHelper(state, name, rule, value),
    }), resolve);
  });

  fulfilHelper = ({ fulfilled }, name, rule, value) => ({
    ...fulfilled,
    [name]: {
      ...fulfilled[name],
      [rule]: !!value,
    },
  });

  checkFulfillment = () => new Promise((resolve) => {
    const { fulfilled } = this.form.state;
    let valid = true;
    Object.keys(fulfilled).forEach((field) => {
      Object.keys(fulfilled[field]).forEach((rule) => {
        if (!fulfilled[field][rule]) {
          valid = false;
        }
      });
    });

    this.form.setState({
      valid,
    }, resolve);
  });

  setError(name, error) {
    return new Promise((resolve) => {
      this.form.setState(({ errors }) => ({
        errors: { ...errors, [name]: error },
      }), resolve);
    });
  }
}

export default Validator;
