import React from 'react';
import toast from 'toastr';
import Form, { connectForm } from '../../../utils/Forms';
import T from '../../../utils/Translation';
import './SignUpForm.scss';
import WithLoading from '../../WithLoading';
import NormalUser from './accounts/NormalUser';
import Company from './accounts/Company';
import Input from '../../../utils/Forms/Input';
import accountTypes from '../../../utils/accountTypes';

class SignUpForm extends Form {
  getProperties() {
    return {
      rules: {
        required: {
          message: T.not_empty,
        },
        email: {
          message: T.valid_email,
        },
      },
      onSuccess: () => {
        const { history } = this.props;
        toast.success(T.registration_success);
        history.push('/login');
      },
      onFailure: () => {
        const { message } = this.props;
        toast.error(message);
      },
    };
  }

  onChange({ target: { name, value } }) {
    super.onChange({ target: { name, value } });
    if (name === 'accountType') {
      setTimeout(() => {
        this.validator.validate('accountType');
      }, 100);
    }
  }

  renderForm() {
    const { valid, values: { accountType } } = this.state;


    const FormElement = accountType === 'company'
      ? Company : NormalUser;

    return (
      <div className="signup-form">
        <Input
          type="select"
          name="accountType"
          options={[
            { value: 'company', name: accountTypes.company },
            { value: 'normal_user', name: accountTypes.normal_user },
          ]}
        />
        <FormElement valid={valid} />
      </div>
    );
  }
}

SignUpForm.propTypes = {

};

export default connectForm(
  WithLoading(SignUpForm, 'loading'),
)('register');
