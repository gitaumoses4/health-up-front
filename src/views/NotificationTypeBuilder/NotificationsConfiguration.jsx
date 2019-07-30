import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toast from 'toastr';
import TabLayout from '../../components/TabLayout';
import config from '../../assets/images/config.svg';
import NotificationCreator from './NotificationCreator';
import './NotificationTypeBuilder.scss';
import BottomSheet from '../../components/BottomSheet';
import DropDownMenu from '../../components/DropDownMenu';
import Button from '../../components/Button';
import T from '../../utils/Translation';
import NotificationForm from '../../components/Forms/NotificationForm';
import NotificationTypeForm from '../../components/Forms/NotificationForm/NotificationTypeForm';

class NotificationsConfiguration extends Component {
  state = {
    currentNotification: null,
    notificationType: null,
    condition: null,
  };

  generateTabsHeader = configurations => configurations.map(configuration => ({
    icon: config,
    title: configuration.name,
  }));

  generateTabs = configurations => configurations.map(configuration => (
    <div key={Math.random()}>
      {this.renderCreator(configuration)}
    </div>
  ));

  modifyNotification = (notification) => {
    this.setState({ ...notification });
  };

  renderCreator = (configuration) => {
    const {
      history, notificationType,
      updateResource,
    } = this.props;

    return (
      <NotificationCreator
        updateResource={updateResource}
        notificationType={notificationType}
        modifyNotification={this.modifyNotification}
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

  handleClose = () => {
    this.setState({ currentNotification: null });
  };


  deleteNotification = () => {
    const { currentNotification: { id } } = this.state;
    const { updateResource, notificationType } = this.props;

    updateResource({
      params: {
        id: notificationType.id,
        notificationId: id,
      },
      endpoint: '/notificationBuilder/types/:id/:notificationId',
      method: 'delete',
      successCallback: ({ message }) => {
        this.handleClose();
        toast.success(message);
      },
    });
  };

  renderNotificationModifier = () => {
    const { currentNotification, notificationType, condition } = this.state;
    return (
      <BottomSheet open={!!currentNotification} onClose={this.handleClose}>
        <div className="notification-editor">
          <div className="header">
            <h1>{T.edit_notification}</h1>
            <DropDownMenu>
              <Button>{T.delete}</Button>
              <div className="confirm-delete">
                <span>{T.confirm_deletion}</span>
                <Button onClick={this.deleteNotification}>{T.yes}</Button>
              </div>
            </DropDownMenu>
          </div>
          {
            currentNotification && (
              <NotificationForm
                notification={currentNotification}
                editing
                notificationType={notificationType}
                condition={condition} />
            )
          }
        </div>
      </BottomSheet>
    );
  };

  renderNotificationBuilder = () => {
    const { notificationType: { conditions } } = this.props;
    const ConfigTabLayout = this.renderTabs;
    return conditions && conditions.length ? (
      <ConfigTabLayout configurations={conditions} />
    ) : (
      this.renderCreator()
    );
  };


  render() {
    const NotificationModifier = this.renderNotificationModifier;
    const NotificationBuilder = this.renderNotificationBuilder;
    return (
      <div className="notification-type-configuration">
        <NotificationBuilder />
        <NotificationModifier />
      </div>
    );
  }
}

NotificationsConfiguration.propTypes = {

};

export default NotificationsConfiguration;
