import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connectResource from '../../utils/ResourceComponent';
import WithLoading from '../../components/WithLoading';
import Layout from '../../Layout';
import NotificationsConfiguration from './NotificationsConfiguration';
import Empty from '../../components/Empty';

class NotificationTypeBuilder extends Component {
  state = {
    currentTab: 0,
  };


  componentDidMount() {
    const { readResource, match: { params: { id } } } = this.props;
    readResource({ params: { id } });
  }

  onTabChange = (currentTab) => {
    this.setState({ currentTab });
  };


  render() {
    const { data: { notificationType }, history, updateResource } = this.props;
    const { currentTab } = this.state;
    return (
      <Layout {...this.props} header={notificationType && notificationType.name}>
        {
          notificationType ? (
            <NotificationsConfiguration
              history={history}
              updateResource={updateResource}
              currentTab={currentTab}
              onTabChange={this.onTabChange}
              notificationType={notificationType} />
          ) : <Empty />
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
