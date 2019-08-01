import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar';
import './ForgotPassword.scss';
import T from '../../utils/Translation';
import ForgotPasswordForm from '../../components/Forms/ForgotPasswordForm';
import Layout from '../../Layout';

class ForgotPassword extends Component {
  render() {
    const { history } = this.props;
    return (
      <Layout
        header={T.reset_password}
        history={history}>
        <div className="forgot-password">
          <ForgotPasswordForm />
        </div>
      </Layout>
    );
  }
}

ForgotPassword.propTypes = {};

ForgotPassword.defaultProps = {};

export default ForgotPassword;
