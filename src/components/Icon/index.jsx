import React from 'react';

const Icon = ({ icon, value, className: otherClassNames }) => {
  let className = icon;
  if (icon.constructor === Object) {
    className = icon[value];
  }
  return (
    <i className={`${className} ${otherClassNames}`} />
  );
};

Icon.propTypes = {};

Icon.defaultProps = {};

export default Icon;
