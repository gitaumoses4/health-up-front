import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './UpdatePasswordForm.scss';
import toast from 'toastr';
import T from '../../../utils/Translation';
import Form, { connectForm } from '../../../utils/Forms';
import Input from '../../../utils/Forms/Input';
import Button from '../../Button';
import WithLoading from '../../WithLoading';

class UpdatePasswordForm extends Form {
  getProperties() {
    return {
      rules: {
        matchPassword: {
          valid: ({ value, values }) => (value === values.password),
          message: T.no_match,
        },
      },
      onSuccess: ({ message }) => {
        toast.success(message);
        this.setState({ values: {}, valid: false });
      },
    };
  }

  createData() {
    return {
      method: 'put',
    };
  }


  renderForm() {
    const { valid } = this.state;
    return (
      <div className="simple-form update-password-form">
        <Input type="password" name="password" label={T.new_password} placeholder={T.new_password} />
        <Input
          type="password" rules={['matchPassword']} name="confirmPassword" label={T.confirm_password}
          placeholder={T.confirm_password} />
        <Button disabled={!valid} type="submit">
          {T.update_password}
        </Button>
      </div>
    );
  }
}

UpdatePasswordForm.propTypes = {

};

export default connectForm(WithLoading(UpdatePasswordForm))('updatePassword');
