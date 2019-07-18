import React from 'react';
import classNames from 'classnames';
import './Input.scss';
import PropTypes from 'prop-types';
import randomString from 'randomstring';
import Dropdown from './Dropdown';
import { FormContext } from '../index';
import TextInput from './TextInput';
import RadioGroup from './RadioGroup';
import TextArea from './TextArea';
import CheckboxGroup from './CheckboxGroup';

class Input extends React.Component {
  switchInput = () => {
    const { type } = this.props;
    switch (type) {
    case 'select':
      return Dropdown;
    case 'radio-group':
      return RadioGroup;
    case 'textarea':
      return TextArea;
    case 'checkbox-group':
      return CheckboxGroup;
    default:
      return TextInput;
    }
  };

  componentDidMount() {
    this.id = randomString.generate(7);
  }

  componentWillUnmount = () => {
    const { name } = this.props;
    this.clearRules(name);
  };

  render() {
    const InputField = this.switchInput();

    const {
      label, id,
      type, inline,
      reverseLabel,
      name, messages = {},
      rules = [],
      formatValue,
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
              label,
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

            const actualValue = values[name] || '';
            return (
              <div className={classes}>
                <div className="input-field">
                  <label htmlFor={id || this.id}>{label}</label>
                  <InputField
                    type={type || 'text'}
                    name={name}
                    id={id || this.id}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    error={errors[name]}
                    placeholder={label || otherProps.placeholder}
                    value={formatValue ? formatValue(actualValue) : actualValue}
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
