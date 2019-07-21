import React, { Component } from 'react';
import toast from 'toastr';
import PropTypes from 'prop-types';
import moment from 'moment';
import NotificationForm, { frequencies, weekDays } from '../../components/Forms/NotificationForm';
import T from '../../utils/Translation';
import ModelTable from '../../components/ModelTable';
import BottomSheet from '../../components/BottomSheet';
import Button from '../../components/Button';
import DropDownMenu from '../../components/DropDownMenu';

export const createFrequencyText = ({
  frequency, time, weekDay, month, day, 
}) => {
  const formatTime = moment(time, 'HH:mm:SS').format('h:mm a');
  switch (frequency) {
  case 'daily':
    return T.daily_at.replace('{}', formatTime);
  case 'weekly':
    return T.weekly_on.replace('{}', T[weekDay]).replace('{}', formatTime);
  case 'monthly':
    return T.monthly_on.replace('{}', day);
  case 'yearly':
    return T.yearly_on.replace('{}', T[month]).replace('{}', day);
  default:
    return frequencies[frequency];
  }
};

class NotificationCreator extends Component {
  NotificationList = ModelTable({
    model: 'notifications',
    columns: {
      text: T.notification_text,
      frequency: T.frequency,
    },
    cards: true,
    renderTable: ({
      id, text, frequency, ...otherProps
    }) => ({
      text,
      frequency: createFrequencyText({ frequency, ...otherProps }),
      onClick: () => {
        this.setState({
          currentNotification: {
            id, text, frequency, ...otherProps,
          }, 
        });
      },
    }),
  });

  state = {
    currentNotification: null,
  };

  createNotifications() {
    const { notificationType: { notifications }, condition } = this.props;

    if (!condition) {
      return notifications;
    }
    return notifications.filter(
      notification => notification.notificationConditionId === condition.id,
    );
  }

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
      endpoint: '/notifications/types/:id/:notificationId',
      method: 'delete',
      successCallback: ({ message }) => toast.success(message),
    });
  };

  render() {
    const {
      notificationType, condition,
    } = this.props;
    const { currentNotification } = this.state;
    const notifications = this.createNotifications();
    const Notifications = this.NotificationList;
    return (
      <div className="notification-creator">
        <div className="notification-creator__form">
          <h1>{T.new_notification}</h1>
          <NotificationForm notificationType={notificationType} condition={condition} />
        </div>
        <div className="notification-creator__list">
          <h1>{T.notifications}</h1>
          <Notifications data={{ notifications }} />
        </div>
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
            <NotificationForm
              notification={currentNotification}
              editing
              notificationType={notificationType}
              condition={condition} />
          </div>
        </BottomSheet>
      </div>
    );
  }
}

NotificationCreator.propTypes = {

};

export default NotificationCreator;
