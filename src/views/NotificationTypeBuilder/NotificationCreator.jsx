import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationForm, { frequencies } from '../../components/Forms/NotificationForm';
import T from '../../utils/Translation';
import ModelTable from '../../components/ModelTable';

const NotificationList = ModelTable({
  model: 'notifications',
  columns: {
    text: T.notification_text,
    frequency: T.frequency,
  },
  cards: true,
  renderTable: ({ id, text, frequency }) => ({
    text,
    frequency: T[frequency],
  }),
});

class NotificationCreator extends Component {
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
    const { notificationType, condition } = this.props;
    const notifications = this.createNotifications();
    return (
      <div className="notification-creator">
        <div className="notification-creator__form">
          <h1>{T.new_notification}</h1>
          <NotificationForm notificationType={notificationType} condition={condition} />
        </div>
        <div className="notification-creator__list">
          <h1>{T.notifications}</h1>
          <NotificationList data={{ notifications }} />
        </div>
      </div>
    );
  }
}

NotificationCreator.propTypes = {

};

export default NotificationCreator;
