import React from 'react';
import PropTypes from 'prop-types';
import './Empty.scss';
import empty from '../../assets/images/empty.svg';
import T from '../../utils/Translation';

const Empty = ({ image = empty, message = T.no_items }) => (
  <div className="empty">
    <img src={image} alt="" />
    <div>{message}</div>
  </div>
);

Empty.propTypes = {

};

export default Empty;
