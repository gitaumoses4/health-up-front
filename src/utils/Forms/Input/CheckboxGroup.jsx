import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { options, value } = nextProps;
    this.setState(Object.keys(options).reduce((acc, cur) => ({
      ...acc,
      [cur]: !!value[cur],
    }), {}));
  };


  onChange = (e) => {
    const event = { ...e };
    const { target: { value } } = e;
    const { onChange, name } = this.props;
    this.setState(state => ({ [value]: !state[value] }), () => {
      onChange({ ...event, target: { ...event.target, name, value: this.state } });
    });
  };

  render() {
    const { options } = this.props;
    const { state } = this;
    return (
      <div className="checkbox-group">
        {
          Object.keys(options).map(option => (
            <div
              className="checkbox-input"
              key={randomstring.generate(4)}>
              <input
                id={this.id + option}
                onChange={this.onChange}
                checked={state[option]}
                value={option}
                type="checkbox" />
              <label htmlFor={this.id + option}>{options[option]}</label>
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
