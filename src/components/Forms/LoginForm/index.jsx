import React from 'react';
import PropTypes from 'prop-types';
import toast from 'toastr';
import { Link } from 'react-router-dom';
import Form, { connectForm } from '../../../utils/Forms';
import Input from '../../../utils/Forms/Input';
import T from '../../../utils/Translation';
import Button from '../../Button';
import './LoginForm.scss';
import WithLoading from '../../WithLoading';
import { AMBULANCE_MAN, NORMAL_USER } from '../../../utils/accountTypes';

const BaseLoginForm = (accountType) => {
  class LoginForm extends Form {
    getProperties() {
      return {
        rules: {
          required: {
            message: T.not_empty,
          },
        },
        onSuccess: ({ token }) => {
          toast.success(T.login_success);
          localStorage.setItem('jwt-token', token);
          window.location.replace('/dashboard');
        },
        onFailure: () => {
          const { message } = this.props;
          toast.error(message);
        },
      };
    }

    renderIdInput = () => {
      if (accountType === AMBULANCE_MAN) {
        return (
          <Input
            name="userId"
            placeholder={T.email_or_ambulance_id}
          />
        );
      }
      return (
        <Input
          name="userId"
          placeholder={T.email_or_id}
        />
      );
    };

    renderForm() {
      const { valid } = this.state;
      return (
        <div className="login-form">
          {this.renderIdInput()}
          <Input
            name="password"
            type="password"
            info={
              <Link to="/forgot-password">{T.forgot_password}</Link>
            }
            placeholder={T.password}
          />
          <Button type="submit" disabled={!valid}>
            {T.sign_in}
          </Button>
          <div className="footer">
            <span>
              {T.dont_have_an_account}
            </span>
            <Button>
              <Link to="/register">
                {T.sign_up}
              </Link>
            </Button>
          </div>
        </div>
      );
    }
  }

  LoginForm.propTypes = {};

  LoginForm.defaultProps = {};
  return LoginForm;
};

export default
(accountType = NORMAL_USER) => connectForm(
  WithLoading(BaseLoginForm(accountType),
    'submitting'),
)(accountType === AMBULANCE_MAN ? 'ambulanceLogin' : 'login');
