import React from 'react';
import PropTypes from 'prop-types';
import notVerified from '../../assets/images/notVerified.svg';
import './NotVerified.scss';

const NotVerified = props => (
  <div className="not-verified">
    <img src={notVerified} alt="" />
    <h3>Your account has not been verified yet. Kindly contact the administrator</h3>
  </div>
);

NotVerified.propTypes = {

};

export default NotVerified;
