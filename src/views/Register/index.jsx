import React from 'react';
import AccountPageWrapper from '../../components/AccountPage';
import T from '../../utils/Translation';
import SignUpForm from '../../components/Forms/SignUpForms';

const Register = AccountPageWrapper({
  header: T.welcome_message,
  message: T.registration_message,
  title: T.create_account,
  form: SignUpForm,
});

export default Register;
