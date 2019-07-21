import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabLayout from '../../components/TabLayout';
import config from '../../assets/images/config.svg';
import NotificationCreator from './NotificationCreator';
import './NotificationTypeBuilder.scss';

class NotificationsConfiguration extends Component {
  generateTabsHeader = configurations => configurations.map(configuration => ({
    icon: config,
    title: configuration.name,
  }));

  generateTabs = (configurations) => {
    const { history, notificationType } = this.props;
    return configurations.map(configuration => (
      <div key={Math.random()}>
        <NotificationCreator
          notificationType={notificationType}
          condition={configuration}
          history={history} />
      </div>
    ));
  };

  onTabChange = () => {

  };

  renderTabs = ({ configurations }) => (
    <TabLayout
      onTabChange={this.onTabChange}
      currentTab={0}
      tabs={this.generateTabsHeader(configurations)}
    >
      {this.generateTabs(configurations)}
    </TabLayout>
  );

  render() {
    const { notificationType, history, notificationType: { conditions } } = this.props;
    const ConfigTabLayout = this.renderTabs;
    return (
      <div className="notification-type-configuration">
        {
          conditions.length ? (
            <ConfigTabLayout configurations={conditions} />
          ) : <NotificationCreator notificationType={notificationType} history={history} />
        }
      </div>
    );
  }
}

NotificationsConfiguration.propTypes = {

};

export default NotificationsConfiguration;
