import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabLayout from '../../../components/TabLayout';
import T from '../../../utils/Translation';
import personal from '../../../assets/images/personal.svg';
import health from '../../../assets/images/health.svg';
import general from '../../../assets/images/general.svg';
import PersonalInfoForm from '../../../components/PersonalInfoForm';
import '../Dashboard.scss';
import CircularProgressBar from '../../../components/CircularProgress';

class UserDashboard extends Component {
  state = {
    currentTab: 0,
  };

  tabs = [
    {
      icon: personal,
      title: 'Personal',
    },
    {
      icon: health,
      title: 'Health',
    },
    {
      icon: general,
      title: 'General',
    },
  ];

  goToNextPage = () => {
    this.setState(({ currentTab }) => ({ currentTab: currentTab + 1 }));
  };

  render() {
    const { currentTab } = this.state;
    return (
      <div className="user-dashboard">
        <div className="profile-form">
          <TabLayout
            tabs={this.tabs}
            currentTab={currentTab}
            onTabChange={tab => this.setState({ currentTab: tab })}
          >
            <PersonalInfoForm goNext={this.goToNextPage} />
            <div>Health</div>
            <div>General</div>
          </TabLayout>
          <div className="profile-completion">
            <h3>{T.profile_completion}</h3>
            <CircularProgressBar percentage={50} sqSize={200} strokeWidth={3} />
          </div>
        </div>
      </div>
    );
  }
}

UserDashboard.propTypes = {

};

export default UserDashboard;
