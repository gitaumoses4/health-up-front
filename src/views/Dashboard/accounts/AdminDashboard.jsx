import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from '../../../Layout';
import T from '../../../utils/Translation';
import CompanyList from '../../../components/CompanyList';
import connectResource from '../../../utils/ResourceComponent';

class AdminDashboard extends Component {
  componentDidMount() {
    const { readResource } = this.props;
    readResource('companies')();
  }

  render() {
    const { history, companies } = this.props;
    return (
      <div className="admin-dashboard">
        <h1>{T.companies}</h1>
        <div>
          <CompanyList {...companies} history={history} />
        </div>
      </div>
    );
  }
}

AdminDashboard.propTypes = {

};

export default connectResource(AdminDashboard)({
  resources: ['companies'],
});
