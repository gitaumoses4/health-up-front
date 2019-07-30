import React from 'react';
import toast from 'toastr';
import Form, { connectForm } from '../../../utils/Forms';
import './NotificationForm.scss';
import T from '../../../utils/Translation';
import Input from '../../../utils/Forms/Input';
import Button from '../../Button';
import WithLoading from '../../WithLoading';
import OptionsFieldSet from './OptionsFieldset';

class NotificationForm extends Form {
  readData({ notification }) {
    return notification ? {
      ...notification,
      ...notification.configuration,
    } : null;
  }

  getProperties() {
    const { editing } = this.props;
    return {
      postData: 'updateResource',
      onSuccess: ({ message }) => {
        toast.success(message);
        this.clearForm();
      },
      mirror: editing,
      onFailure: ({ message }) => {
        toast.error(message);
      },
    };
  }


  createData() {
    const { values: { id: notificationId, text, ...otherValues } } = this.state;
    const { condition, notificationType: { id } } = this.props;
    return {
      data: {
        id: notificationId,
        text,
        configuration: {
          ...otherValues,
        },
        condition: condition && condition.id,
      },
      method: 'put',
      params: {
        id,
      },
    };
  }

  renderOptions = () => {
    const { notificationType: { single, alert } } = this.props;
    const { values } = this.state;
    return single && (
      <OptionsFieldSet alert={alert} values={values} />
    );
  };


  renderForm() {
    const { valid } = this.state;
    const { editing } = this.props;
    const TimeOptions = this.renderOptions;
    return (
      <div className="notification-form">
        <Input type="textarea" name="text" label={T.notification_text} placeholder={T.notification_text} />
        <TimeOptions />
        <Button type="submit" disabled={!valid}>
          {editing ? T.update : T.create}
        </Button>
      </div>
    );
  }
}

NotificationForm.propTypes = {

};

export default connectForm(
  WithLoading(NotificationForm, 'submitting'),
)('notificationType', ['update']);
