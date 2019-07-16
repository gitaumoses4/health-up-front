import React, { Component } from 'react';
import Layout from '../../Layout';
import accountTypes from '../../utils/accountTypes';
import UserDashboard from './accounts/UserDashboard';

class Dashboard extends Component {
  componentDidMount() {
  }

  renderDashboard = ({ user: { accountType } }) => {
    switch (accountType) {
    case 'normal_user':
      return <UserDashboard />;
    default:
      return null;
    }
  };

  render() {
    const { user: { data: { user } } } = this.props;
    const DashboardContent = this.renderDashboard;
    return (
      <Layout {...this.props}>
        <div className="dashboard-page">
          <DashboardContent user={user} />
        </div>
      </Layout>
    );
  }
}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
