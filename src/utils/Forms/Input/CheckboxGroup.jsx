import React, { Component } from 'react';
import * as randomstring from 'randomstring';

class CheckboxGroup extends Component {
  id = randomstring.generate(6);

  state = {

  };

  componentDidMount() {
    this.updateValues(this.props);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.updateValues(nextProps);
  }

  updateValues = (nextProps) => {
    const { options, value, showInput = {} } = nextProps;
    this.setState(Object.keys(options).reduce((acc, cur) => ({
      ...acc,
      [cur]: !!value[cur],
    }), {}));

    this.setState(Object.values(showInput).reduce((acc, cur) => ({
      ...acc,
      [cur]: value[cur],
    }), {}));
  };


  onChange = (e) => {
    const event = { ...e };
    const { target: { value } } = e;
    this.setState(state => ({ [value]: !state[value] }), () => {
      this.triggerChange(event);
    });
  };

  triggerChange = (event = {}) => {
    const { onChange, name } = this.props;
    onChange({ ...event, target: { ...event.target, name, value: this.state } });
  };

  onTextAreaChanged = (e) => {
    const event = { ...e };
    const { target: { value, name } } = e;
    this.setState({ [name]: value }, () => {
      this.triggerChange(event);
    });
  };

  render() {
    const { options, disabled, showInput = {} } = this.props;
    const { state } = this;
    return (
      <div className="checkbox-group">
        {
          Object.keys(options).map((option, index) => (
            <div className="checkbox-input__wrapper" key={index}>
              <div
                className="checkbox-input">
                <input
                  id={this.id + option}
                  onChange={this.onChange}
                  disabled={disabled}
                  checked={state[option]}
                  value={option}
                  type="checkbox" />
                <label htmlFor={this.id + option}>{options[option]}</label>
              </div>
              {
                showInput[option] && state[option] && (
                  <textarea
                    value={state[showInput[option]]}
                    name={showInput[option]}
                    onChange={this.onTextAreaChanged} />
                )
              }
            </div>
          ))
        }
      </div>
    );
  }
}

CheckboxGroup.propTypes = {

};

export default CheckboxGroup;
