import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../utils/Forms/Input';
import T from '../../../../utils/Translation';
import Button from '../../../Button';

const Company = ({ valid, values: { noOfEmployees = 0 } }) => (
  <React.Fragment>
    <Input
      cloudinaryUrl={process.env.REACT_APP_CLOUDINARY_API}
      uploadPreset={process.env.REACT_APP_CLOUDINARY_PRESET}
      name="receipt"
      type="file"
      placeholder={T.receipt} />
    <Input name="name" placeholder={T.company_name} rules={['required']} />
    <Input name="email" rules={['required', 'email']} placeholder={T.email} />
    <Input name="password" type="password" placeholder={T.password} />
    <Input name="naturalBusinessCompany" placeholder={T.natural_business} />
    <Input name="registrationNumber" placeholder={T.registration_number} />
    <Input name="noOfEmployees" type="number" min="1" placeholder={T.number_of_employees} />
    <Input name="responsibleName" placeholder={T.responsible_name} />
    <div className="cost">
      {`${T.total_cost} - ${noOfEmployees * 250} ${T.sar}`}
    </div>
    <Button type="submit" disabled={!valid}>{T.sign_up}</Button>
  </React.Fragment>
);

Company.propTypes = {

};

export default Company;
