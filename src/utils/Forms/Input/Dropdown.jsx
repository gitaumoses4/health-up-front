import React from 'react';
import PropTypes from 'prop-types';
import './Dropdown.scss';
import T from '../../Translation';

const Dropdown = ({
  name, type, value, options = [], onChange,
}) => {
  const renderOption = option => (
    <option
      key={Math.random()}
      value={option.value}>
      { option.name }
    </option>
  );
  const renderOptions = () => options.map((option) => {
    if (option.constructor === Object) {
      return renderOption(option);
    }
    return renderOption({ name: option, value: option });
  });

  return (
    <select value={value} name={name} onChange={onChange}>
      <option value="">{`-- ${T.select} --`}</option>
      {
        renderOptions()
      }
    </select>
  );
};

Dropdown.propTypes = {

};

export default Dropdown;
