import React, { Component } from 'react';
import Layout from '../../Layout';
import accountTypes, { ADMINISTRATOR, COMPANY, NORMAL_USER } from '../../utils/accountTypes';
import UserDashboard from './accounts/UserDashboard';
import CompanyDashboard from './accounts/CompanyDashboard';
import AdminDashboard from './accounts/AdminDashboard';
import AmbulanceManDashboard from './accounts/AmbulanceManDashboard';

class Dashboard extends Component {
  componentDidMount() {
  }

  renderDashboard = ({ user: { accountType }, history }) => {
    switch (accountType) {
    case NORMAL_USER:
      return <UserDashboard />;
    case COMPANY:
      return <CompanyDashboard />;
    case ADMINISTRATOR:
      return <AdminDashboard history={history} />;
    default:
      return <AmbulanceManDashboard history={history} />;
    }
  };

  render() {
    const { user: { data: { user } }, history } = this.props;
    const DashboardContent = this.renderDashboard;
    return (
      <Layout {...this.props}>
        <div className="dashboard-page">
          <DashboardContent user={user} history={history} />
        </div>
      </Layout>
    );
  }
}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
