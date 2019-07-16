import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../../utils/Forms';
import Input from '../../utils/Forms/Input';
import T from '../../utils/Translation';

class HealthInformationForm extends Form {
  renderForm() {
    return (
      <div className="health-information-form">
        <Input
          name="bloodType"
          label={T.blood_type}
          placeholder={T.blood_type}
        />
        <div className="radio-buttons">
          <span>{T.are_you_a_smoker}</span>
          <Input name="smoker" value="yes" type="radio" label="Yes" />
          <Input name="smoker" value="no" type="radio" label="No" />
        </div>
      </div>
    );
  }
}

HealthInformationForm.propTypes = {};

HealthInformationForm.defaultProps = {};

export default HealthInformationForm;
