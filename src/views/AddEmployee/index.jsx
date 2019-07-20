import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../Layout';
import T from '../../utils/Translation';
import AddEmployeeForm from '../../components/Forms/AddEmployeeForm';

const AddEmployee = props => (
  <Layout {...props} header={T.add_employee}>
    <AddEmployeeForm />
  </Layout>
);

AddEmployee.propTypes = {

};

export default AddEmployee;
