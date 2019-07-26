import React from 'react';
import PropTypes from 'prop-types';
import toast from 'toastr';
import Form, { connectForm } from '../../../utils/Forms';
import Input from '../../../utils/Forms/Input';
import T from '../../../utils/Translation';
import Button from '../../Button';
import WithLoading from '../../WithLoading';
import { AMBULANCE_MAN, NORMAL_USER } from '../../../utils/accountTypes';


const AddEmployeeForm = (accountType = NORMAL_USER) => {
  class BaseForm extends Form {
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
          this.clearForm();
        },
      };
    }

    renderForm() {
      const { valid } = this.state;
      return (
        <div className="add-employee-form simple-form">
          <Input name="name" label={T.name} placeholder={T.name} />
          <Input name="email" rules={['email']} label={T.email} placeholder={T.email} />
          {
            accountType === AMBULANCE_MAN && (
              <Input name="ambulanceId" label={T.ambulance_id} placeholder={T.ambulance_id} />
            )
          }
          <Input name="password" label={T.password} placeholder={T.password} type="password" />
          <Input
            name="confirmPassword"
            rules={['matchPassword']}
            label={T.confirm_password}
            placeholder={T.confirm_password} type="password" />
          <Button type="submit" disabled={!valid}>
            {T.add}
          </Button>
        </div>
      );
    }
  }

  BaseForm.propTypes = {

  };
  return BaseForm;
};

export default connectForm(
  WithLoading(AddEmployeeForm(), 'submitting'),
)('employees');

export const AddAmbulanceManForm = connectForm(
  WithLoading(AddEmployeeForm(AMBULANCE_MAN), 'submitting'),
)('ambulances');
