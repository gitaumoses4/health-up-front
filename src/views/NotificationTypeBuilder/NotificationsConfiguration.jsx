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

  generateTabs = configurations => configurations.map(configuration => (
    <div key={Math.random()}>
      {this.renderCreator(configuration)}
    </div>
  ));

  renderCreator = (configuration) => {
    const {
      history, notificationType,
      updateResource,
    } = this.props;

    return (
      <NotificationCreator
        updateResource={updateResource}
        notificationType={notificationType}
        condition={configuration}
        history={history} />
    );
  };

  renderTabs = ({ configurations }) => {
    const { currentTab, onTabChange } = this.props;
    return (
      <TabLayout
        onTabChange={onTabChange}
        currentTab={currentTab}
        tabs={this.generateTabsHeader(configurations)}
      >
        {this.generateTabs(configurations)}
      </TabLayout>
    );
  };

  render() {
    const { notificationType: { conditions } } = this.props;
    const ConfigTabLayout = this.renderTabs;
    return (
      <div className="notification-type-configuration">
        {
          conditions.length ? (
            <ConfigTabLayout configurations={conditions} />
          ) : (
            this.renderCreator()
          )
        }
      </div>
    );
  }
}

NotificationsConfiguration.propTypes = {

};

export default NotificationsConfiguration;
