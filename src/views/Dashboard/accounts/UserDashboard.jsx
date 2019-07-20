import React, { Component } from 'react';
import T from '../../../utils/Translation';
import PersonalInfoForm from '../../../components/Forms/PersonalInfoForm';
import '../Dashboard.scss';
import CircularProgressBar from '../../../components/CircularProgress';
import HealthInformationForm from '../../../components/Forms/HealthInformationForm';
import GeneralInformationForm from '../../../components/Forms/GeneralInformationForm';
import UserTabs from '../../../components/UserTabs';

const CURRENT_TAB = 'UserDashboard.currentTab';
class UserDashboard extends Component {
  state = {
    currentTab: localStorage.getItem(CURRENT_TAB),
  };

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
          <UserTabs
            currentTab={currentTab}
            onTabChange={tab => this.setState({ currentTab: tab })}
          >
            <PersonalInfoForm goNext={this.goToNextPage} />
            <HealthInformationForm goNext={this.goToNextPage} goBack={this.goToPreviousPage} />
            <GeneralInformationForm goBack={this.goToPreviousPage} />
          </UserTabs>
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
