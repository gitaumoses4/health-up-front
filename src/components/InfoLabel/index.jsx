import React from 'react';
import PropTypes from 'prop-types';
import Tools from '../../utils/Tools';
import './InfoLabel.scss';

const InfoLabel = ({
  title, children, value, inline, 
}) => (
  <div className={`info-label ${inline ? 'inline' : ''}`}>
    <div className="title">{title}</div>
    {
      children || <span className="value">{Tools.s(value)}</span>
    }
  </div>
);

InfoLabel.propTypes = {

};

export default InfoLabel;
