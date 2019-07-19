import React from 'react';
import PropTypes from 'prop-types';
import './CompanyProfileForm.scss';
import toast from 'toastr';
import Form, { connectForm } from '../../../utils/Forms';
import T from '../../../utils/Translation';
import Input from '../../../utils/Forms/Input';
import Button from '../../Button';
import WithLoading from '../../WithLoading';

class CompanyProfileForm extends Form {
  readData(nextProps) {
    const { data: { company } } = nextProps;
    return company ? {
      ...company,
      name: company.owner.name,
      email: company.owner.email,
    } : null;
  }

  getProperties() {
    return {
      mirror: true,
      onSuccess: ({ message }) => {
        toast.success(message);
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
      <div className="simple-form company-profile-form">
        <Input name="name" disabled required={false} placeholder={T.company_name} label={T.company_name} />
        <Input name="email" disabled required={false} placeholder={T.email} label={T.email} />
        <Input name="registrationNumber" placeholder={T.registration_number} label={T.registration_number} />
        <Input name="noOfEmployees" placeholder={T.employees} label={T.employees} />
        <Input name="naturalBusiness" placeholder={T.natural_business} label={T.natural_business} />
        <Input name="responsibleName" placeholder={T.responsible_name} label={T.responsible_name} />
        <Button disabled={!valid} type="submit">
          {T.update}
        </Button>
      </div>
    );
  }
}

CompanyProfileForm.propTypes = {

};

export default connectForm(WithLoading(CompanyProfileForm))('companyProfile');
