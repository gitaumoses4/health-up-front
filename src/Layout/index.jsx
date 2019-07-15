import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import './Layout.scss';
import connectResource from '../utils/ResourceComponent';
import accountTypes from '../utils/accountTypes';

class Layout extends Component {
  render() {
    const {
      children, data: { user }, match, history, 
    } = this.props;
    return user ? (
      <div className="layout-wrapper">
        <NavBar />
        <div className="layout-body">
          <SideBar type={user.accountType} match={match} history={history} />
          <div className="content">
            { children }
          </div>
        </div>
      </div>
    ) : null;
  }
}

Layout.propTypes = {

};

export default connectResource(Layout)({
  resources: ['user'],
  setToProps: true,
});
