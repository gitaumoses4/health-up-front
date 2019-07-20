import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from '../../Layout';
import T from '../../utils/Translation';
import UserProfileInfo from '../../components/UserProfileInfo';

class ViewEmployee extends Component {
  componentDidMount() {
  }

  render() {
    const { match: { params: { id } } } = this.props;
    return (
      <Layout {...this.props} header={T.employee_info}>
        <UserProfileInfo userId={id} />
      </Layout>
    );
  }
}

ViewEmployee.propTypes = {

};

export default ViewEmployee;
