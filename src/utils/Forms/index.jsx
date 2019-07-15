import React from 'react';
import Validator from './validator';
import connectResource from '../ResourceComponent';

export const FormContext = React.createContext({
  values: {},
  errors: {},
  valid: false,
});

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.validator = new Validator(this, this.rules());
  }

  componentWillMount() {
    const defaultState = {
      values: {},
      errors: {},
      valid: false,
      rules: {},
      fulfilled: {},
      messages: {},
      optionalFields: [],
      onChange: this.onChange,
      onBlur: this.onBlur,
      onFocus: this.onFocus,
      updateRules: this.updateRules,
      clearRules: this.clearRules,
    };
    this.setState(state => ({
      ...defaultState,
      ...state,
    }));
  }

  componentDidMount() {
    const { rules } = this.state;
    Object.keys(rules).forEach((rule) => {
      this.validator.validate(rule);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      errors: nextProps.errors,
    });
  }

  onSubmit() {
    const { createResource } = this.props;
    if (createResource) createResource(this.createData());
  }

  onSuccess(data) {

  }

  onFailure(data) {

  }


  updateRules = (name, rules, messages) => {
    this.setState(state => ({
      rules: { ...state.rules, [name]: rules },
      messages: { ...state.messages, [name]: messages },
      fulfilled: {
        ...state.fulfilled,
        [name]: rules.reduce((acc, cur) => ({ ...acc, [cur]: false }), {}),
      },
    }), () => {
      const { values } = this.state;
      if (values[name]) {
        this.validator.validate(name);
      }
    });
  };

  clearRules = (name, callback) => {
    const {
      rules, messages, fulfilled, values, errors,
    } = this.state;
    const current = {
      rules, messages, fulfilled, values, errors,
    };
    delete current.rules[name];
    delete current.messages[name];
    delete current.fulfilled[name];
    delete current.values[name];
    if (errors) delete current.errors[name];

    this.setState({ ...current });
  };

  onChange = ({ target: { name, value } }) => {
    this.setState(({ values }) => (
      { values: { ...values, [name]: value } }
    ), () => this.validator.validate(name));
  };

  onBlur = ({ target: { name, value } }) => {
    this.validator.validate(name);
  };

  onFocus = (e) => {

  };

  updateState = (state) => {
    if (state) {
      if (state.constructor === Function) {
        this.setState(curState => state(curState));
      } else {
        this.setState(state);
      }
    }
  };

  isOptional = (name) => {
    const { optionalFields } = this.state;
    return optionalFields.includes(name);
  };

  createData() {
    const { values } = this.state;
    return { data: values, successCallback: this.onSuccess, errorCallback: this.onFailure };
  }

  rules() {

  }

  renderForm() {

  }

  render() {
    return (
      <form
        onSubmit={(e) => { e.preventDefault(); this.onSubmit(); }}
        className="form-element">
        <FormContext.Provider value={this.state}>
          { this.renderForm() }
        </FormContext.Provider>
      </form>
    );
  }
}

export const connectForm = Component => resource => connectResource(Component)(
  { resources: [resource], setToProps: true },
);

export default Form;
