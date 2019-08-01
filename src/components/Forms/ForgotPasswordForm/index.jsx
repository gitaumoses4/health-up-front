import React, { Component } from 'react';
import toast from 'toastr';
import Form, { connectForm } from '../../../utils/Forms';
import T from '../../../utils/Translation';
import Input from '../../../utils/Forms/Input';
import Button from '../../Button';
import WithLoading from '../../WithLoading';

class ForgotPasswordForm extends Form {
  getProperties() {
    return {
      onSuccess: () => {
        this.setState({ resetSuccess: true });
      },
    };
  }

  renderForm() {
    const { valid, resetSuccess } = this.state;
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

export default connectForm(WithLoading(ForgotPasswordForm, 'submitting'))(
  'forgotPassword',
);
