import React from 'react';
import _ from 'lodash';
import Validator from './validator';
import connectResource from '../ResourceComponent';

export const FormContext = React.createContext({
  values: {},
  errors: {},
  valid: false,
});

const defaultProperties = {
  rules: {},
  autoSave: false,
  mirror: false,
  debounce: 1000,
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.properties = _.merge({}, defaultProperties, this.getProperties());
    this.validator = new Validator(this, this.properties.rules || {});
    this.onChange = this.onChange.bind(this);
    this.updateRules = this.updateRules.bind(this);
    this.clearRules = this.clearRules.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    this.initialize(this.properties);
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
    const { mirror } = this.properties;
    const values = this.readData(nextProps);
    if (mirror && values) {
      this.setState({
        values,
      });
    }
  }


  onSubmit() {
    const { createResource } = this.props;
    if (createResource) createResource(this.createData());
  }

  onSuccess(data) {

  }

  onFailure(data) {

  }


  updateRules(name, rules, messages) {
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
  }

  clearRules(name, callback) {
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
  }

  onChange({ target: { name, value } }) {
    this.setState(({ values }) => (
      { values: { ...values, [name]: value } }
    ), () => this.validator.validate(name, () => {
      const { autoSave } = this.properties;
      if (autoSave) {
        this.autoSave();
      }
    }));
  }

  onBlur({ target: { name, value } }) {
    this.validator.validate(name);
  }

  onFocus(e) {

  }

  createData() {
    const { values } = this.state;
    return { data: values, successCallback: this.onSuccess, errorCallback: this.onFailure };
  }

  readData(nextProps) {
    return null;
  }
  
  getProperties() {
    return { };
  }

  initialize({ mirror, autoSave, debounce }) {
    if (autoSave) {
      this.autoSave = _.debounce(this.onSubmit, debounce);
      this.properties.mirror = true;
    }
    
    const { readResource } = this.props;
    if (readResource && mirror) readResource();
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
