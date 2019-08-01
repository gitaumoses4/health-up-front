import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WithLoading from '../../components/WithLoading';
import notificationsIcon from '../../assets/images/notificationBell.svg';
import connectResource from '../../utils/ResourceComponent';
import T from '../../utils/Translation';
import Empty from '../../components/Empty';
import { createAlertText } from '../NotificationTypeBuilder/NotificationCreator';

class NotificationTypes extends Component {
  componentDidMount() {
    const { readResource } = this.props;
    readResource();
  }


  renderTypeCard = ({
    history, notificationType: {
      id, name, conditions,
      notifications,
      alert, single, configuration,
    },
  }) => (
    <div
      className="notification-type"
      role="presentation"
      onClick={() => history.push(`/builder/notifications/${id}`)}
    >
      <div className="notification-type__icon">
        <img src={notificationsIcon} alt="" />
        <span>{notifications ? notifications.length : 0}</span>
      </div>
      <div className="notification-type__title">{name}</div>
      <div className="timeline-info">
        {
          !single ? configuration ? createAlertText(alert, configuration)
            : T.alert_time_not_set
            : T.different_alert_times
        }
      </div>
    </div>
  );

  render() {
    const { data: { notificationTypes }, loading, history } = this.props;
    const NotificationType = this.renderTypeCard;
    return (
      <div className="notification-type-list">
        {
          !loading && notificationTypes ? (
            notificationTypes.map(type => (
              <NotificationType notificationType={type} history={history} key={Math.random()} />
            ))
          ) : <Empty />
        }
      </div>
    );
  }
}

NotificationTypes.propTypes = {

};

export default connectResource(WithLoading(NotificationTypes))({
  resources: ['notificationTypes'],
  setToProps: true,
});
