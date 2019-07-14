import React from 'react';
import PropTypes from 'prop-types';
import './Dropdown.scss';

const Dropdown = ({ name, type, value, options = [], onChange}) => {

  const renderOption = (option) => {
    return (
      <option key={Math.random()} value={option.value}>
        { option.name }
      </option>
    );
  };
  const renderOptions = () => {
    return options.map((option) => {
      if( option.constructor === Object){
        return renderOption(option);
      }else {
        return renderOption({ name: option, value: option});
      }
    });
  };

  return (
    <select name={name} onChange={onChange}>
      {
        renderOptions()
      }
    </select>
  );
};

Dropdown.propTypes = {

};

export default Dropdown;
