import React from 'react';
import T from '../../../utils/Translation';
import Input from '../../../utils/Forms/Input';
import {
  days, frequencies, monthDays, months, ranges, weekDays,
} from './options';

const OptionsFieldSet = ({ values, alert }) => {
  const renderFrequencyOption = () => {
    const { frequency, month, time = '23:59' } = values;
    switch (frequency) {
    case 'daily':
      return (
        <Input type="time" name="time" value={time} label={T.time} />
      );
    case 'weekly':
      return (
        <>
          <Input type="select" name="weekDay" label={T.day} options={weekDays} />
          <Input type="time" name="time" value={time} label={T.time} />
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

  return alert === 'frequency' ? (
    <>
      <Input type="select" name="frequency" options={frequencies} label={T.frequency} />
      { renderFrequencyOption() }
    </>
  ) : (
    <div className="notification-form__range_selector">
      <Input type="number" name="rangeValue" label={T.after_every} placeholder="" />
      <Input type="select" name="range" options={ranges} />
    </div>
  );
};

OptionsFieldSet.propTypes = {};

OptionsFieldSet.defaultProps = {};

export default OptionsFieldSet;
