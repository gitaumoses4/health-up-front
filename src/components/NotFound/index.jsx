import React from 'react';
import PropTypes from 'prop-types';
import './NotFound.scss';
import { Link } from 'react-router-dom';
import T from '../../utils/Translation';
import notFound from '../../assets/images/notFound.svg';
import logo from '../../assets/images/logo.svg';
import Button from '../Button';

const NotFound = props => (
  <div className="page-not-found">
    <div className="logo">
      <img src={logo} alt="" />
    </div>
    <div className="page-not-found__content">
      <h2>{T.sorry}</h2>
      <img src={notFound} alt="" />
      <h2>{T.not_found}</h2>
      <Link to="/dashboard">
        <Button>
          {T.home}
        </Button>
      </Link>
    </div>
  </div>
);

NotFound.propTypes = {};

NotFound.defaultProps = {};

export default NotFound;
