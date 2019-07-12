import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Validator from './validator';
import {submitForm} from './actions';

export const FormContext = React.createContext({
  values: {},
  errors: {},
  valid: false
});

class Form extends React.Component{

  constructor(props){
    super(props);
    this.validator = new Validator(this, this.rules());
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
    this.state = {...defaultState};
  }


  componentWillReceiveProps (nextProps){
    this.setState({
      errors: nextProps.errors
    });
  }

  onSubmit(){
    const { submit } = this.props;
    const { values } = this.state;
    submit(values, this.onSuccess, this.onFailure);
  }

  onSuccess(data){

  }

  onFailure(data){

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


  rules(){

  }

  renderForm(){

  }

  render() {
    return (
      <form
        onSubmit={(e) => {e.preventDefault(); this.onSubmit();}}
        className="form-element">
        <FormContext.Provider value={this.state}>
          { this.renderForm() }
        </FormContext.Provider>
      </form>
    );
  }
}

export const connectForm = (Form) => ({
  endpoint, baseURL, method = 'post', name,
  mapStateToProps = (state) => {},
  mapDispatchToProps = {}
}) => {
  const formName = name || Form.name;
  Form.formConfig = {
    endpoint: `${baseURL}${endpoint}`,
    method: method,
    name: formName,
  };

  return connect((state) => ({
    ...state.forms[formName],
    ...mapStateToProps(state)
  }), {
    submit: submitForm(Form.formConfig),
    ...mapDispatchToProps
  })(Form);
};

export default Form;
