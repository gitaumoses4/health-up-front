import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toast from 'toastr';
import Form, { connectForm } from '../../../utils/Forms';
import T from '../../../utils/Translation';
import OptionsFieldSet from './OptionsFieldset';
import './NotificationForm.scss';
import Button from '../../Button';
import WithLoading from '../../WithLoading';

class NotificationTypeForm extends Form {
  readData({ notificationType }) {
    return notificationType ? {
      ...notificationType.configuration,
    } : null;
  }

  getProperties() {
    const { editing, handleSubmission } = this.props;
    return {
      postData: 'updateResource',
      onSuccess: ({ message }) => {
        toast.success(message);
        handleSubmission();
      },
      mirror: editing,
      onFailure: ({ message }) => {
        toast.error(message);
        handleSubmission();
      },
    };
  }

  createData() {
    const { values } = this.state;
    const { notificationType: { id } } = this.props;
    return {
      data: {
        configuration: {
          ...values,
        },
      },
      method: 'put',
      endpoint: 'notificationBuilder/types/:id/configuration',
      params: {
        id,
      },
    };
  }

  renderForm() {
    const { notificationType: { alert }, editing } = this.props;
    const { values, valid } = this.state;
    return (
      <div className="notification-type-form">
        <h3>{T.when_to_send}</h3>
        <OptionsFieldSet alert={alert} values={values} />
        <Button disabled={!valid} type="submit">
          {
            editing ? T.update : T.create
          }
        </Button>
      </div>
    );
  }
}

NotificationTypeForm.propTypes = {};

NotificationTypeForm.defaultProps = {};

export default connectForm(WithLoading(NotificationTypeForm, 'submitting'))(
  'notificationType', ['update'],
);
