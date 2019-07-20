import React from 'react';
import PropTypes from 'prop-types';
import CompanyInfo from '../../components/CompanyInfo';
import Layout from '../../Layout';
import T from '../../utils/Translation';

const ViewCompany = ({ ...props }) => (
  <Layout {...props} header={T.company_information}>
    <CompanyInfo {...props} />
  </Layout>
);

ViewCompany.propTypes = {

};

export default ViewCompany;
