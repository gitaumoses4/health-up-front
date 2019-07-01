import React from 'react';
import PropTypes from 'prop-types';
import background from '../../assets/images/background.svg';
import logo from '../../assets/images/logo.svg';
import './AccountPage.scss';

const AccountPageWrapper = (header, message, title) => {
  class AccountPage extends React.Component{
    render() {
      return (
        <div className="account-page">
          <div className="background">
            <img src={background} alt="" className="image" />
            <div className="banner">
              <h3>{header}</h3>
              <p>{message}</p>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <img src={logo} alt="" />
              <h3>{title}</h3>
            </div>
          </div>
        </div>
      );
    }
  }

  AccountPage.propTypes = {

  };
  return AccountPage;
};


export default AccountPageWrapper;
