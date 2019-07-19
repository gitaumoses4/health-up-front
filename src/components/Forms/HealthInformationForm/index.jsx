import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form, { connectForm } from '../../../utils/Forms';
import Input from '../../../utils/Forms/Input';
import T from '../../../utils/Translation';
import './HealthInformationForm.scss';
import Button from '../../Button';
import WithLoading from '../../WithLoading';

class HealthInformationForm extends Form {
  illnesses = {
    sugar: T.blood_sugar,
    bloodPressure: T.blood_pressure,
    bloodDiseases: T.blood_diseases,
    respiratory: T.respiratory_diseases,
    heartDiseases: T.heart_diseases,
  };

  allergies = {
    food: T.food,
    drugs: T.drugs,
    animals: T.animals,
    plants: T.plants,
    others: T.others_specify,
  };

  getProperties() {
    return {
      autoSave: true,
      mirror: true,
      autoSaveLoader: true,
      optionalFields: '*',
    };
  }

  readData(nextProps) {
    const { data: { profile } } = nextProps;
    if (profile) {
      return {
        ...profile.healthInformation,
      };
    }
  }

  createData() {
    const { values } = this.state;
    return {
      method: 'put',
      data: {
        healthInformation: {
          ...values,
        },
      },
    };
  }

  renderForm() {
    const { goNext, goBack, submitting } = this.props;
    const { values: { allergies, operations } } = this.state;
    return (
      <div className="health-information-form">
        <div className="form">
          <div>
            <Input name="bloodType" label={T.blood_type} placeholder={T.blood_type} />
            <Input name="smoker" type="radio-group" label={T.are_you_a_smoker} options={{ yes: T.yes, no: T.no }} />
            <Input name="drugsUsed" type="textarea" label={T.drugs_used} />
            <Input name="operations" type="radio-group" label={T.have_you_had_operations} options={{ yes: T.yes, no: T.no }} />
            {
              operations === 'yes' && (
                <Input name="operationsHad" type="textarea" />
              )
            }
          </div>
          <div>
            <Input name="familyHistory" type="checkbox-group" label={T.family_history} options={this.illnesses} />
            <Input name="currentIllness" type="checkbox-group" label={T.current_illnesses} options={this.illnesses} />
            <Input name="allergies" type="checkbox-group" label={T.are_you_allergic_to} options={this.allergies} />
            {
              allergies && allergies.others && (
                <Input name="otherAllergies" type="textarea" />
              )
            }
          </div>
        </div>
        <div className="button-group">
          <Button onClick={goBack} disabled={submitting}>{T.previous}</Button>
          <Button onClick={goNext} disabled={submitting}>{T.next}</Button>
        </div>
      </div>
    );
  }
}

HealthInformationForm.propTypes = {};

HealthInformationForm.defaultProps = {};

export default connectForm(WithLoading(HealthInformationForm))('userProfile');
