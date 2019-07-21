import React from 'react';
import PropTypes from 'prop-types';
import ReactTimePicker from 'react-time-picker';

const TimePicker = props => (
  <div className="time-picker">
    <ReactTimePicker
      {...props}
      onChange={value => props.onChange({ target: { value, name: props.name } })} />
  </div>
);

TimePicker.propTypes = {

};

export default TimePicker;
