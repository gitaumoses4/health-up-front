import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connectResource from '../../utils/ResourceComponent';
import WithLoading from '../../components/WithLoading';
import Layout from '../../Layout';
import NotificationsConfiguration from './NotificationsConfiguration';
import Empty from '../../components/Empty';
import './NotificationTypeBuilder.scss';
import T from '../../utils/Translation';
import { createAlertText } from './NotificationCreator';
import Button from '../../components/Button';
import BottomSheet from '../../components/BottomSheet';
import NotificationTypeForm from '../../components/Forms/NotificationForm/NotificationTypeForm';

class NotificationTypeBuilder extends Component {
  state = {
    currentTab: 0,
    editTimeline: false,
  };


  componentDidMount() {
    const { readResource, match: { params: { id } } } = this.props;
    readResource({ params: { id } });
  }

  onTabChange = (currentTab) => {
    this.setState({ currentTab });
  };

  toggleBottomSheet = () => {
    this.setState(({ editTimeline }) => ({ editTimeline: !editTimeline }));
  };

  hideBottomSheet = () => {
    this.setState({ editTimeline: false });
  };


  renderHeader = ({
    name, single, alert, configuration,
  }) => (
    !single ? (
      <div className="notification-builder__header">
        <h2 className="title">{name}</h2>
        {
          configuration && (
            <div className="alert-time">
              {createAlertText(alert, configuration)}
            </div>
          )
        }
        <Button onClick={this.toggleBottomSheet}>
          {configuration ? T.update : T.set_time}
        </Button>
      </div>
    ) : name
  );


  render() {
    const { data: { notificationType }, history, updateResource } = this.props;
    const { currentTab, editTimeline } = this.state;
    return (
      <Layout {...this.props} header={notificationType && this.renderHeader(notificationType)}>
        {
          notificationType ? (
            <div className="notification-builder">
              <NotificationsConfiguration
                history={history}
                updateResource={updateResource}
                currentTab={currentTab}
                onTabChange={this.onTabChange}
                notificationType={notificationType} />
              <BottomSheet open={editTimeline} onClose={this.hideBottomSheet}>
                <NotificationTypeForm
                  notificationType={notificationType}
                  handleSubmission={this.hideBottomSheet}
                  editing={!!notificationType.configuration} />
              </BottomSheet>
            </div>
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
