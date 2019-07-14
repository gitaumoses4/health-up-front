import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ ...props })=> {
  return (
    <input
      {...props}
      autoComplete="off"
    />
  );
};

TextInput.propTypes = {
  
};

export default TextInput;
