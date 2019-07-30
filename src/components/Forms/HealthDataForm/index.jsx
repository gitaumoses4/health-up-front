import React, { Component } from 'react';
import Form, { connectForm } from '../../../utils/Forms';
import T from '../../../utils/Translation';
import './HealthData.scss';
import Input from '../../../utils/Forms/Input';
import Button from '../../Button';
import WithLoading from '../../WithLoading';


class HealthDataForm extends Form {
  getProperties() {
    return {
      optionalFields: '*',
      autoSave: true,
      autoSaveLoader: true,
      mirror: true,
    };
  }

  readData(nextProps) {
    const { data: { healthInformation } } = nextProps;
    return healthInformation;
  }

  createData() {
    return {
      method: 'put',
    };
  }

  renderForm() {
    const { submitting } = this.props;
    return (
      <div className="health-data-form">
        <Input
          type="input-checkbox"
          inputType="date"
          checkboxLabel={T.i_dont_remember}
          checkboxValue="dontRemember"
          name="dentist"
          label={T.last_visit_to_dentist} />
        <Input
          type="input-checkbox"
          inputType="date"
          checkboxLabel={T.i_dont_remember}
          checkboxValue="dontRemember"
          name="ophthalmologist"
          label={T.last_visit_to_ophthalmologist} />
        <Input
          type="input-checkbox"
          inputType="date"
          checkboxLabel={T.i_dont_remember}
          checkboxValue="dontRemember"
          name="earDoctor"
          label={T.last_visit_to_ear_doctor} />
        <Input
          type="input-checkbox"
          inputType="date"
          checkboxLabel={T.i_dont_remember}
          checkboxValue="dontRemember"
          name="bloodAnalysis"
          label={T.last_blood_analysis} />
        <Button className={submitting ? 'submitting' : ''}>
          {submitting ? T.saving : T.saved}
        </Button>
      </div>
    );
  }
}

HealthDataForm.propTypes = {};

HealthDataForm.defaultProps = {};

export default connectForm(WithLoading(HealthDataForm))('healthData');
