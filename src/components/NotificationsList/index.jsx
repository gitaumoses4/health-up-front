import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import formatDistance from 'date-fns/distance_in_words_to_now/';
import _ from 'lodash';
import notificationBell from '../../assets/images/notificationBell.svg';
import connectResource from '../../utils/ResourceComponent';
import WithLoading from '../WithLoading';
import './NotificationList.scss';
import Empty from '../Empty';

class NotificationsList extends Component {
  renderNotification = (notification) => {
    const { createdAt, status, systemNotification: { text } } = notification;
    const className = classNames({
      notification: true,
      card: true,
      clickable: true,
      [status]: true,
    });

    return (
      <div
        key={Math.random()}
        role="presentation"
        onClick={() => this.readNotification(notification)}
        className={className}
      >
        <p className="text">
          <img src={notificationBell} alt="" />
          {text}
        </p>
        <span className="meta">
          {_.capitalize(formatDistance(moment(createdAt), new Date()))}
        </span>
      </div>
    );
  };

  readNotification = (notification) => {
    const { updateResource } = this.props;
    if (notification.status !== 'read') {
      updateResource({
        endpoint: '/notifications/read/:id',
        params: {
          id: notification.id,
        },
      });
    }
  };

  renderNotifications = ({ notifications }) => (
    <div className="list">
      {
        notifications.map(this.renderNotification)
      }
    </div>
  );

  render() {
    const { data } = this.props;
    const List = this.renderNotifications;
    return (
      <div className="notifications-list">
        {
          data && data.length ? (
            <List notifications={data} />
          ) : <Empty />
        }
      </div>
    );
  }
}

NotificationsList.propTypes = {

};

export default connectResource(WithLoading(NotificationsList))({
  resources: ['notifications'],
  setToProps: true,
});
