import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connectResource from '../../utils/ResourceComponent';
import WithLoading from '../../components/WithLoading';
import Layout from '../../Layout';
import NotificationsConfiguration from './NotificationsConfiguration';

class NotificationTypeBuilder extends Component {
  componentDidMount() {
    const { readResource, match: { params: { id } } } = this.props;
    readResource({ params: { id } });
  }

  render() {
    const { data: { notificationType }, history } = this.props;
    return (
      <Layout {...this.props} header={notificationType && notificationType.name}>
        {
          notificationType && (
            <NotificationsConfiguration history={history} notificationType={notificationType} />
          )
        }
      </Layout>
    );
  }
}

NotificationTypeBuilder.propTypes = {

};

export default connectResource(WithLoading(NotificationTypeBuilder))({
  resources: ['notificationType'],
  setToProps: true,
});
