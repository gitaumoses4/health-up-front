import React, { Component } from 'react';
import PropTypes from 'prop-types';
import T from '../../utils/Translation';
import health from '../../assets/images/health.svg';
import Layout from '../../Layout';
import HealthDataForm from '../../components/Forms/HealthDataForm';
import TabLayout from '../../components/TabLayout';

class HealthData extends Component {
  render() {
    return (
      <Layout {...this.props}>
        <div className="health-data">
          <TabLayout tabs={[
            { icon: health, title: T.health_records },
          ]}>
            <HealthDataForm />
          </TabLayout>
        </div>
      </Layout>
    );
  }
}

HealthData.propTypes = {};

HealthData.defaultProps = {};

export default HealthData;
