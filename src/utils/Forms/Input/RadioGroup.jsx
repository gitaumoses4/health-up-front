import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as randomstring from 'randomstring';

class RadioGroup extends Component {
  id = randomstring.generate(4);

  render() {
    const {
      options, onChange, name, value, 
    } = this.props;
    return (
      <div className="radio-group">
        {
          Object.keys(options).map(option => (
            <div
              className="radio-input"
              key={randomstring.generate(6)}
            >
              <label htmlFor={this.id + option}>{options[option]}</label>
              <input
                type="radio"
                onChange={onChange}
                id={this.id + option}
                name={name}
                checked={value === option}
                value={option}
              />
            </div>
          ))
        }
      </div>
    );
  }
}

RadioGroup.propTypes = {

};

export default RadioGroup;
