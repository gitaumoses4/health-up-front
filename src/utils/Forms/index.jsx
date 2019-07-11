import React from 'react';
import _ from 'lodash';
import Validator from './validator';

export const FormContext = React.createContext({
  values: {},
  errors: {},
  valid: false
});

class Form extends React.Component{

  constructor(props){
    super(props);
    this.validator = new Validator(this, props.rules);
    const { state: parentState = {} } = this.props;
    const defaultState = {
      values: {},
      errors: {},
      valid: false,
      rules: {},
      fulfilled: {},
      messages: {},
      optionalFields: [],
      onChange : this.onChange,
      onBlur: this.onBlur,
      onFocus: this.onFocus,
      updateRules: this.updateRules,
    };
    this.state = _.merge({}, defaultState, parentState);
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  updateRules = (name, rules, messages) => {
    this.setState((state) => {
      return {
        rules: { ...state.rules, [name]: rules},
        messages: {...state.messages, [name]: messages},
        fulfilled: {
          ...state.fulfilled,
          [name]: rules.reduce((acc, cur) => ({...acc, [cur]: false}), {})
        }
      };
    });
  };

  onChange = ({ target: { name, value}}) => {
    this.setState(({ values }) => {
      return {values: {...values, [name]: value}};
    },() => this.validator.validate(name));
  };

  onBlur = ({ target: { name, value }}) => {
    this.validator.validate(name);
  };

  onFocus = (e) => {

  };

  updateState = (state) => {
    if(state){
      if(state.constructor === Function){
        this.setState((curState) => state(curState));
      }else{
        this.setState(state);
      }
    }
  };

  isOptional = (name) => {
    const { optionalFields } = this.state;
    return optionalFields.includes(name);
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { children, className = '' } = this.props;
    return (
      <form onSubmit={this.onSubmit} className={`form-element ${className}`}>
        <FormContext.Provider value={this.state}>
          { children }
        </FormContext.Provider>
      </form>
    );
  }
}

export default Form;
