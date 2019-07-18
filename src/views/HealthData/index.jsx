import React, { Component } from 'react';
import PropTypes from 'prop-types';
import T from '../../utils/Translation';
import Layout from '../../Layout';
import HealthDataForm from '../../components/Forms/HealthDataForm';

class HealthData extends Component {
  render() {
    return (
      <Layout {...this.props}>
        <div className="health-data">
          <h1>{T.health_information}</h1>
          <HealthDataForm />
        </div>
      </Layout>
    );
  }
}

HealthData.propTypes = {};

HealthData.defaultProps = {};

export default HealthData;
