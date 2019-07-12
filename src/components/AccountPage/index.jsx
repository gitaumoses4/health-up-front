import React from 'react';
import PropTypes from 'prop-types';
import background from '../../assets/images/background.svg';
import logo from '../../assets/images/logo.svg';
import './AccountPage.scss';

const AccountPageWrapper = ({header, message, title, form: FormElement}) => {
  class AccountPage extends React.Component{

    goBack = () => {
      window.location.replace('/');
    };

    render() {
      const { history } = this.props;
      return (
        <div className="account-page">
          <div className="background">
            <span
              onClick={this.goBack}
              className="back"
              role="presentation">
              <i className="fas fa-arrow-left" />
            </span>
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
            <div className="form">
              {
                FormElement ? <FormElement history={history} /> : null
              }
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
