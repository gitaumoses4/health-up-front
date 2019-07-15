import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabLayout from '../../../components/TabLayout';
import personal from '../../../assets/images/personal.svg';
import health from '../../../assets/images/health.svg';
import general from '../../../assets/images/general.svg';
import PersonalInfoForm from '../../../components/PersonalInfoForm';

class UserDashboard extends Component {
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

  render() {
    return (
      <div className="user-dashboard">
        <TabLayout tabs={this.tabs}>
          <PersonalInfoForm />
          <div>Health</div>
          <div>General</div>
        </TabLayout>
      </div>
    );
  }
}

UserDashboard.propTypes = {

};

export default UserDashboard;
