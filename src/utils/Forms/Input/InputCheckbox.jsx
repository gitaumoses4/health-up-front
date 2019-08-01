import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputCheckbox extends Component {
  state = {
    text: '',
    checked: false,
  };

  componentDidMount() {
    this.retrieveData(this.props);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.retrieveData(nextProps);
  }

  retrieveData = ({ value, checkboxValue }) => {
    if (value === checkboxValue) {
      this.setState(({ checked: true, text: '' }));
    } else {
      this.setState({ checked: false, text: value });
    }
  };

  handleCheckboxChange = (e) => {
    this.setState(({ checked }) => ({ checked: !checked }), () => {
      const { checked } = this.state;
      const { onChange, checkboxValue, name } = this.props;
      onChange({
        ...e,
        target: { ...e.target, name, value: checked ? checkboxValue || true : null },
      });
    });
  };

  handleInputChange = (e) => {
    const { target: { value } } = e;
    const { onChange, name } = this.props;
    this.setState({ text: value });
    onChange({ ...e, target: { ...e.target, value, name } });
  };

  render() {
    const { text, checked } = this.state;
    const { inputType = 'text', name, checkboxLabel } = this.props;
    return (
      <div className="input-checkbox">
        {
          <input
            {...this.props} type={inputType}
            value={text} onChange={this.handleInputChange} />
        }
        <div>
          <input
            id={`${name}-checkbox`}
            type="checkbox"
            onChange={this.handleCheckboxChange}
            checked={checked}
          />
          <label htmlFor={`${name}-checkbox`}>
            {checkboxLabel}
          </label>
        </div>
      </div>
    );
  }
}

InputCheckbox.propTypes = {};

InputCheckbox.defaultProps = {};

export default InputCheckbox;
