import React from 'react';
import PropTypes from 'prop-types';
import NotificationsList from '../../components/NotificationsList';
import Layout from '../../Layout';
import T from '../../utils/Translation';

const Notifications = props => (
  <Layout {...props} header={T.notifications}>
    <NotificationsList />
  </Layout>
);

Notifications.propTypes = {

};

export default Notifications;
