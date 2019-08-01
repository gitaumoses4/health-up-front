import React, { Component } from 'react';
import toast from 'toastr';
import { UpdatePasswordForm } from '../UpdatePasswordForm';
import { connectForm } from '../../../utils/Forms';
import WithLoading from '../../WithLoading';

class ResetPasswordForm extends UpdatePasswordForm {
  getProperties() {
    const { history } = this.props;
    return {
      ...super.getProperties(),
      onSuccess: ({ message }) => {
        toast.success(message);
        history.push('/login');
      },
      onFailure: ({ data: { message } }) => {
        toast.error(message);
      },
    };
  }

  createData() {
    const { token } = this.props;
    const { values: { password } } = this.state;
    return {
      method: 'put',
      data: {
        token,
        password,
      },
    };
  }
}

export default connectForm(WithLoading(ResetPasswordForm, 'submitting'))(
  'resetPassword',
);
