import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Form from '../../../utils/Forms';
import T from '../../../utils/Translation';
import Input from '../../../utils/Forms/Input';
import Button from '../../Button';

class ForgotPasswordForm extends Form {
  renderForm() {
    const { valid, resetSuccess = true } = this.state;
    return (
      <div className="forgot-password-form">
        {
          resetSuccess ? (
            <div className="password-reset-success">
              <p>
                {T.password_reset_success}
              </p>
              <Button onClick={() => {
                this.setState({ resetSuccess: false });
              }}>
                { T.resend }
              </Button>
            </div>
          ) : (
            <div>
              <Input placeholder={T.email_or_id} name="userId" />
              <Button type="submit" disabled={!valid}>
                {T.reset}
              </Button>
            </div>
          )
        }
      </div>
    );
  }
}

ForgotPasswordForm.propTypes = {};

ForgotPasswordForm.defaultProps = {};

export default ForgotPasswordForm;
