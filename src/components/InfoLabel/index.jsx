import React from 'react';
import PropTypes from 'prop-types';
import Tools from '../../utils/Tools';
import './InfoLabel.scss';

const InfoLabel = ({
  title, children, value, inline, className = '',
}) => (
  <div className={`info-label ${className} ${inline ? 'inline' : ''}`}>
    <div className="title">{title}</div>
    {
      children || <span className="value">{Tools.s(value)}</span>
    }
  </div>
);

InfoLabel.propTypes = {

};

export default InfoLabel;
