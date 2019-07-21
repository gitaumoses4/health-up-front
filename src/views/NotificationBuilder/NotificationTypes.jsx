import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WithLoading from '../../components/WithLoading';
import notificationsIcon from '../../assets/images/notifications.svg';
import connectResource from '../../utils/ResourceComponent';
import T from '../../utils/Translation';
import Empty from '../../components/Empty';

class NotificationTypes extends Component {
  componentDidMount() {
    const { readResource } = this.props;
    readResource();
  }


  renderTypeCard = ({
    history, notificationType: {
      id, name, conditions, notifications, 
    }, 
  }) => (
    <div
      className="notification-type card clickable"
      role="presentation"
      onClick={() => history.push(`/builder/notifications/${id}`)}
    >
      <img src={notificationsIcon} alt="" />
      <h3>{name}</h3>
      <div>
        <span className="count">{notifications ? notifications.length : 0}</span>
        <span>{T.configured_notifications}</span>
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
