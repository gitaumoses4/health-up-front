import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toast from 'toastr';
import moment from 'moment';
import Form, { connectForm } from '../../../utils/Forms';
import './NotificationForm.scss';
import T from '../../../utils/Translation';
import Input from '../../../utils/Forms/Input';
import Button from '../../Button';
import WithLoading from '../../WithLoading';

const currentYear = moment().year();

export const frequencies = [
  { name: T.daily, value: 'daily' },
  { name: T.weekly, value: 'weekly' },
  { name: T.monthly, value: 'monthly' },
  { name: T.yearly, value: 'yearly' },
];

export const weekDays = [
  { name: T.monday, value: 'monday' },
  { name: T.tuesday, value: 'tuesday' },
  { name: T.wednesday, value: 'wednesday' },
  { name: T.thursday, value: 'thursday' },
  { name: T.friday, value: 'friday' },
  { name: T.saturday, value: 'saturday' },
  { name: T.sunday, value: 'sunday' },
];

export const months = [
  { name: T.january, value: 'january' },
  { name: T.february, value: 'february' },
  { name: T.march, value: 'march' },
  { name: T.april, value: 'april' },
  { name: T.may, value: 'may' },
  { name: T.june, value: 'june' },
  { name: T.july, value: 'july' },
  { name: T.august, value: 'august' },
  { name: T.september, value: 'september' },
  { name: T.october, value: 'october' },
  { name: T.november, value: 'november' },
  { name: T.december, value: 'december' },
];

const monthDays = {
  january: 31,
  february: currentYear % 4 === 0 ? 29 : 28,
  march: 31,
  april: 30,
  may: 31,
  june: 30,
  july: 31,
  august: 31,
  september: 30,
  october: 31,
  november: 30,
  december: 31,
};

const days = (count = 31) => Array(count).fill(0).map(
  (_, index) => ({ name: index + 1, value: index + 1 }),
);

class NotificationForm extends Form {
  renderFrequencyOption = () => {
    const { values: { frequency, month } } = this.state;
    switch (frequency) {
    case 'daily':
      return (
        <Input type="time" name="time" value="23:59" label={T.time} />
      );
    case 'weekly':
      return (
        <>
          <Input type="select" name="weekDay" label={T.day} options={weekDays} />
          <Input type="time" name="time" value="23:59" label={T.time} />
        </>
      );
    case 'monthly':
      return (
        <Input type="select" name="day" label={T.day} options={days(31)} />
      );
    case 'yearly':
      return (
        <>
          <Input type="select" name="month" label={T.month} options={months} />
          <Input type="select" name="day" label={T.day} options={days(monthDays[month])} />
        </>
      );
    default:
      break;
    }
  };

  readData({ notification }) {
    return {
      ...notification,
    };
  }

  getProperties() {
    const { editing } = this.props;
    return {
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
    const { values } = this.state;
    const { condition, notificationType: { id } } = this.props;
    return {
      data: {
        ...values,
        condition: condition && condition.id,
      },
      params: {
        id,
      },
    };
  }


  renderForm() {
    const { valid } = this.state;
    const { editing } = this.props;
    return (
      <div className="notification-form">
        <Input type="textarea" name="text" label={T.notification_text} placeholder={T.notification_text} />
        <Input type="select" name="frequency" options={frequencies} label={T.frequency} />
        { this.renderFrequencyOption() }
        <Button type="submit" disabled={!valid}>
          {editing ? T.update : T.create}
        </Button>
      </div>
    );
  }
}

NotificationForm.propTypes = {

};

export default connectForm(WithLoading(NotificationForm, 'submitting'))('notificationType', ['create']);
