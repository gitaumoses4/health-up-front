import React from 'react';
import PropTypes from 'prop-types';
import toast from 'toastr';
import Form, {connectForm} from '../../utils/Forms';
import Input from '../../utils/Forms/Input';
import T from '../../utils/Translation';
import Button from '../Button';
import './LoginForm.scss';
import WithLoading from '../WithLoading';

class LoginForm extends Form {

  rules(){
    return {
      required: {
        message: T.not_empty
      },
    };
  }


  onSuccess = () => {
    const { history } = this.props;
    toast.success(T.login_success);
    history.push('/dashboard');
  };

  onFailure = () => {
    const { message } = this.props;
    toast.error(message);
  };

  renderForm() {
    const { valid } = this.state;
    return (
      <div className="login-form">
        <Input
          name="email"
          placeholder={T.email}
          rules={['email']}
          messages={{
            email: T.valid_email
          }}
        />
        <Input
          name="password"
          type="password"
          placeholder={T.password}
        />
        <Button type="submit" disabled={!valid}>
          {T.sign_in}
        </Button>
      </div>
    );
  }
}

LoginForm.propTypes = {};

LoginForm.defaultProps = {};

export default connectForm(
  WithLoading(LoginForm, 'submitting')
)({
  baseURL: process.env.REACT_APP_BASE_URL,
  endpoint: 'users/login',
  name: 'LOGIN_FORM'
});
