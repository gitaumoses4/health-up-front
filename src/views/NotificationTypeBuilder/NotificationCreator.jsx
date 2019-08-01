import React, { Component } from 'react';
import toast from 'toastr';
import PropTypes from 'prop-types';
import moment from 'moment';
import NotificationForm from '../../components/Forms/NotificationForm';
import T from '../../utils/Translation';
import ModelTable from '../../components/ModelTable';
import BottomSheet from '../../components/BottomSheet';
import Button from '../../components/Button';
import DropDownMenu from '../../components/DropDownMenu';
import { frequencies, weekDays } from '../../components/Forms/NotificationForm/options';

export const createAlertText = (alert, {
  frequency, time, weekDay, month, day, range, rangeValue,
}) => {
  if (alert === 'frequency') {
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
  } else {
    return `${rangeValue} ${T[range]}`;
  }
};

class NotificationCreator extends Component {
  NotificationList = ({ alert, single }) => {
    const columns = { text: T.notification_text };
    if (single) {
      columns[alert] = alert === 'frequency' ? T.frequency : T.after_every;
    }

    const { modifyNotification, notificationType, condition } = this.props;

    const table = ModelTable({
      model: 'notifications',
      columns,
      cards: true,
      renderTable: (notification) => {
        const {
          id, text, configuration,
        } = notification;
        return {
          text,
          [alert]: createAlertText(alert, configuration),
          onClick: () => {
            modifyNotification({
              currentNotification: notification,
              notificationType,
              condition,
            });
          },
        };
      },
    });
    return table;
  };

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

  render() {
    const {
      notificationType, condition,
    } = this.props;
    const notifications = this.createNotifications();
    const Notifications = this.NotificationList(notificationType);
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
      </div>
    );
  }
}

NotificationCreator.propTypes = {

};

export default NotificationCreator;
