import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../../../utils/Forms';
import Input from '../../../utils/Forms/Input';
import T from '../../../utils/Translation';
import Button from '../../Button';
import './GeneralInformationForm.scss';

class GeneralInformationForm extends Form {
  renderForm() {
    return (
      <div className="general-information-form">
        <div className="form">
          <Input name="bloodType" placeholder={T.blood_type} label={T.blood_type} />
          <Input name="height" placeholder={T.height} label={T.height} />
          <Input name="weight" placeholder={T.weight} label={T.weight} />
        </div>
        <div className="button-group">
          <Button>{T.previous}</Button>
          <Button>{T.save}</Button>
        </div>
      </div>
    );
  }
}

GeneralInformationForm.propTypes = {

};

export default GeneralInformationForm;
