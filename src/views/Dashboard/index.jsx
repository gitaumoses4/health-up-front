import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import T from '../../utils/Translation';

const Dashboard = (props) => {
  return (
    <div className="dashboard-page">
      <h1>{T.welcome_message}</h1>
      <Link to="/login">
        Logout
      </Link>
    </div>
  );
};

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
