import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import formatDistance from 'date-fns/distance_in_words_to_now/';
import _ from 'lodash';
import connectResource from '../../utils/ResourceComponent';
import WithLoading from '../WithLoading';
import './NotificationList.scss';
import Empty from '../Empty';
import T from '../../utils/Translation';
import Button from '../Button';
import Icon from '../Icon';
import SwipeContainer from '../SwipeContainer';

class NotificationsList extends Component {
  renderNotification = (notification) => {
    const {
      createdAt, status, systemNotification: { text },
    } = notification;
    const className = classNames({
      notification: true,
      [status]: true,
    });


    return (
      <div
        key={Math.random()}
        role="presentation"
        onClick={() => this.readNotification(notification)}
        className={className}
      >
        <div className="notification__body">
          <div className="notification__main">
            <p className="text">
              <Icon icon={{ unread: 'fas fa-bell', read: 'far fa-bell' }} value={status} />
              {text}
            </p>
            <span className="meta">
              {_.capitalize(formatDistance(moment(createdAt), new Date()))}
            </span>
          </div>
          <div />
        </div>
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
      <SwipeContainer>
        {
          notifications.map(this.renderNotification)
        }
      </SwipeContainer>
    </div>
  );

  render() {
    const { data, dropdown } = this.props;
    const List = this.renderNotifications;
    return (
      <div className={`notifications-list ${dropdown ? 'dropdown' : ''}`}>
        {
          data && data.length ? (
            <div className="notification__content">
              <List notifications={data} />
              {
                dropdown && (
                  <div className="notification__footer">
                    <Link to="/notifications">
                      <Button>
                        {T.view_all}
                      </Button>
                    </Link>
                  </div>
                )
              }
            </div>
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
