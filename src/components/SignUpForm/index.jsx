import React from 'react';
import toast from 'toastr';
import Form, {connectForm} from '../../utils/Forms';
import Input from '../../utils/Forms/Input';
import Button from '../Button';
import T from '../../utils/Translation';
import './SignUpForm.scss';

class SignUpForm extends Form {

  rules(){
    return {
      required: {
        message: T.not_empty,
      },
      email: {
        message: T.valid_email
      }
    };
  }

  onSuccess(){
    const { history } = this.props;
    toast.success(T.registration_success);
    history.push('/home');
  }

  renderForm(){
    const { valid } = this.state;
    return (
      <div className="signup-form">
        <Input
          name="name"
          placeholder={T.name}
          rules={['required']}
        />
        <Input
          name="email"
          rules={['required', 'email']}
          placeholder={T.email}
        />
        <Input
          name="password"
          type="password"
          placeholder={T.password} />
        <Button
          type="submit"
          disabled={!valid}
        >
          {T.sign_up}
        </Button>
      </div>
    );
  }
}

SignUpForm.propTypes = {

};

export default connectForm(SignUpForm)({
  endpoint: 'users/register',
  baseURL: process.env.REACT_APP_BASE_URL,
});
