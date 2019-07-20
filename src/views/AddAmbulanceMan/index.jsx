import React from 'react';
import PropTypes from 'prop-types';
import { AddAmbulanceManForm } from '../../components/Forms/AddEmployeeForm';
import T from '../../utils/Translation';
import Layout from '../../Layout';

const AddAmbulanceMan = props => (
  <Layout {...props} header={T.add_ambulance_man}>
    <AddAmbulanceManForm />
  </Layout>
);

AddAmbulanceMan.propTypes = {

};

export default AddAmbulanceMan;
