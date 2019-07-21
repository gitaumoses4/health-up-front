import React, { Component } from 'react';
import Layout from '../../Layout';
import './NotificationConfiguration.scss';
import T from '../../utils/Translation';
import NotificationTypes from './NotificationTypes';

class NotificationBuilder extends Component {
  render() {
    const { history } = this.props;
    return (
      <Layout {...this.props}>
        <div className="notification-configuration">
          <h1>{T.notifications}</h1>
          <NotificationTypes history={history} />
        </div>
      </Layout>
    );
  }
}

NotificationBuilder.propTypes = {

};

export default NotificationBuilder;
