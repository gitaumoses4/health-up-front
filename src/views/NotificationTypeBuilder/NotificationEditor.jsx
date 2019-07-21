import React, { Component } from 'react';
import PropTypes from 'prop-types';
import T from '../../utils/Translation';
import EditNotificationForm from '../../components/Forms/NotificationForm/EditNotificationForm';

class NotificationEditor extends Component {
  render() {
    const { notification } = this.props;
    return (
      <div className="notification-editor">
        <div className="header">
          <h1>{T.edit_notification}</h1>
        </div>
        <div>
          <EditNotificationForm notification={notification} />
        </div>
      </div>
    );
  }
}

NotificationEditor.propTypes = {

};

export default NotificationEditor;
