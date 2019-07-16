import React from 'react';
import classNames from 'classnames';
import './Input.scss';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import { FormContext } from '../index';
import TextInput from './TextInput';

class Input extends React.Component {
  switchInput = () => {
    const { type } = this.props;
    switch (type) {
    case 'select':
      return Dropdown;
    default:
      return TextInput;
    }
  };

  componentWillUnmount = () => {
    const { name } = this.props;
    this.clearRules(name);
  };

  render() {
    const InputField = this.switchInput();

    const {
      label,
      type, inline,
      reverseLabel,
      name, messages = {},
      rules = [],
      required, ...otherProps
    } = this.props;
    return (
      <FormContext.Consumer>
        {
          ({
            values,
            errors = {},
            rules: parentRules, optionalFields,
            onChange, onBlur,
            clearRules, onFocus, updateRules,
          }) => {
            const errorClasses = classNames({
              error: true,
            });
            this.clearRules = clearRules;
            const classes = classNames({
              'form-input': true,
              error: errors[name],
              inline,
              reverseLabel,
            });
            if (optionalFields !== '*' && !optionalFields.includes(name) && !required) {
              if (!rules.includes('required')) {
                rules.push('required');
              }
            }
            rules.forEach((rule) => {
              if (!parentRules[name] || !parentRules[name].includes(rule)) {
                updateRules(name, rules, messages);
              }
            });
            return (
              <div className={classes}>
                <div className="input-field">
                  <label htmlFor={name}>{label}</label>
                  <InputField
                    type={type || 'text'}
                    name={name}
                    id={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    error={errors[name]}
                    placeholder={label || otherProps.placeholder}
                    value={values[name] || ''}
                    {...otherProps} />
                </div>
                <span className={errorClasses}>{errors[name]}</span>
              </div>
            );
          }
        }
      </FormContext.Consumer>
    );
  }
}

Input.propTypes = {

};

export default Input;
