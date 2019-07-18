import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form, { connectForm } from '../../../utils/Forms';
import Input from '../../../utils/Forms/Input';
import T from '../../../utils/Translation';
import Button from '../../Button';
import './GeneralInformationForm.scss';
import WithLoading from '../../WithLoading';

class GeneralInformationForm extends Form {
  getProperties() {
    return {
      autoSave: true,
      autoSaveLoader: true,
      mirror: true,
      optionalFields: '*',
    };
  }

  readData(nextProps) {
    const { data: { profile } } = nextProps;
    return profile ? {
      ...profile.generalInformation,
    } : null;
  }

  createData() {
    const { values } = this.state;
    return {
      method: 'put',
      data: {
        generalInformation: {
          ...values,
        },
      },
    };
  }

  renderForm() {
    const { submitting, goBack } = this.props;
    return (
      <div className="general-information-form">
        <div className="form">
          <Input name="bloodType" placeholder={T.blood_type} label={T.blood_type} />
          <Input name="height" placeholder={T.height} label={T.height} />
          <Input name="weight" placeholder={T.weight} label={T.weight} />
        </div>
        <div className="button-group">
          <Button disabled={submitting} onClick={goBack}>{T.previous}</Button>
        </div>
      </div>
    );
  }
}

GeneralInformationForm.propTypes = {

};

export default connectForm(WithLoading(GeneralInformationForm))('userProfile');
