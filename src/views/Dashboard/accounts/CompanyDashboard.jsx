import React from 'react';
import PropTypes from 'prop-types';
import T from '../../../utils/Translation';
import '../Dashboard.scss';
import CompanyProfileForm from '../../../components/Forms/CompanyProfileForm';
import UpdatePasswordForm from '../../../components/Forms/UpdatePasswordForm';


const CompanyDashboard = props => (
  <div className="company-dashboard">
    <h1>{T.company_profile}</h1>
    <div className="company-profile-forms">
      <CompanyProfileForm />
      <UpdatePasswordForm />
    </div>
  </div>
);

CompanyDashboard.propTypes = {

};

export default CompanyDashboard;
