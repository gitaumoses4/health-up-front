import React from 'react';
import _ from 'lodash';
import Loader from 'react-loader-spinner';
import Validator from './validator';
import './Forms.scss';
import connectResource from '../ResourceComponent';
import T from '../Translation';

export const FormContext = React.createContext({
  values: {},
  errors: {},
  valid: false,
});

const defaultProperties = {
  rules: {},
  autoSave: false,
  autoSaveLoader: false,
  mirror: false,
  debounce: 1000,
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.properties = _.merge({}, defaultProperties, this.getProperties());
    this.validator = new Validator(this, {
      required: {
        message: T.not_empty,
      },
      email: {
        message: T.valid_email,
      },
      ...(this.properties.rules || {}),
    });
    this.onChange = this.onChange.bind(this);
    this.updateRules = this.updateRules.bind(this);
    this.clearRules = this.clearRules.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  componentWillMount() {
    const defaultState = {
      values: {},
      errors: {},
      valid: false,
      rules: {},
      fulfilled: {},
      messages: {},
      readOnly: this.properties.readOnly,
      optionalFields: this.properties.optionalFields || [],
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
      }, () => {
        Object.keys(values).forEach(value => this.validator.validate(value));
      });
    }
  }


  onSubmit() {
    this.validator.validateAll().then(() => {
      const { createResource } = this.props;
      const { values, valid } = this.state;
      const { onSuccess, onFailure } = this.properties;
      const data = {
        data: values,
        successCallback: onSuccess,
        errorCallback: onFailure,
        ...this.createData(),
      };
      if (createResource && valid) createResource(data);
    });
  }

  clearForm() {
    this.setState({ values: {}, valid: false, fulfilled: {} });
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
    ), () => this.validator.validate(name).then(() => {
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
    return {};
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
    if (readResource && mirror) readResource(this.properties.readResource || {});
  }

  renderForm() {

  }

  render() {
    const { autoSaveLoader } = this.properties;
    const { submitting } = this.props;
    return (
      <form
        onSubmit={(e) => { e.preventDefault(); this.onSubmit(); }}
        className="form-element">
        {
          autoSaveLoader && (
            <div className={`loader ${submitting ? 'showing' : ''}`}>
              <Loader type="Oval" width={20} height={20} color="#000" />
            </div>
          )
        }
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
