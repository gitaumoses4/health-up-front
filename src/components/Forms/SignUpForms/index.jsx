import React from 'react';
import toast from 'toastr';
import { Link } from 'react-router-dom';
import Form, { connectForm } from '../../../utils/Forms';
import T from '../../../utils/Translation';
import './SignUpForm.scss';
import WithLoading from '../../WithLoading';
import NormalUser from './accounts/NormalUser';
import Company from './accounts/Company';
import Input from '../../../utils/Forms/Input';
import accountTypes, { COMPANY, NORMAL_USER } from '../../../utils/accountTypes';
import Button from '../../Button';

class SignUpForm extends Form {
  getProperties() {
    return {
      rules: {
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


    const FormElement = accountType === COMPANY
      ? Company : NormalUser;

    return (
      <div className="signup-form">
        <Input
          type="select"
          name="accountType"
          options={[
            { value: COMPANY, name: accountTypes.company },
            { value: NORMAL_USER, name: accountTypes.normal_user },
          ]}
        />
        <FormElement valid={valid} />
        <div className="footer">
          <span>
            {T.already_have_and_account}
          </span>
          <Button>
            <Link to="/login">
              {T.login}
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}

SignUpForm.propTypes = {

};

export default connectForm(
  WithLoading(SignUpForm, 'loading'),
)('register');
