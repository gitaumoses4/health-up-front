import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabLayout from '../../../components/TabLayout';
import T from '../../../utils/Translation';
import personal from '../../../assets/images/personal.svg';
import health from '../../../assets/images/health.svg';
import general from '../../../assets/images/general.svg';
import PersonalInfoForm from '../../../components/Forms/PersonalInfoForm';
import '../Dashboard.scss';
import CircularProgressBar from '../../../components/CircularProgress';
import HealthInformationForm from '../../../components/Forms/HealthInformationForm';
import GeneralInformationForm from '../../../components/Forms/GeneralInformationForm';

const CURRENT_TAB = 'UserDashboard.currentTab';
class UserDashboard extends Component {
  state = {
    currentTab: localStorage.getItem(CURRENT_TAB),
  };

  tabs = [
    {
      icon: personal,
      title: T.personal,
    },
    {
      icon: health,
      title: T.health,
    },
    {
      icon: general,
      title: T.general,
    },
  ];

  goToNextPage = () => {
    this.setState(({ currentTab }) => ({ currentTab: currentTab + 1 }));
  };

  goToPreviousPage = () => {
    this.setState(({ currentTab }) => ({ currentTab: currentTab - 1 }));
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { currentTab } = this.state;
    localStorage.setItem(CURRENT_TAB, currentTab);
  }

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
            <HealthInformationForm goNext={this.goToNextPage} goBack={this.goToPreviousPage} />
            <GeneralInformationForm goBack={this.goToPreviousPage} />
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
