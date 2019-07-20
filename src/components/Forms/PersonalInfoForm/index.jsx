import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import moment from 'moment';
import T from '../../../utils/Translation';
import Form, { connectForm } from '../../../utils/Forms';
import Input from '../../../utils/Forms/Input';
import './PersonalInfoForm.scss';
import Button from '../../Button';
import WithLoading from '../../WithLoading';

class PersonalInfoForm extends Form {
  state = {
    optionalFields: '*',
  };


  readData(nextProps) {
    const { data: { profile } } = nextProps;
    if (profile) {
      return {
        ...profile,
        dateOfBirth: profile.dateOfBirth ? moment(profile.dateOfBirth).format('YYYY-MM-DD') : null,
        ...profile.personalInformation,
      };
    }
  }

  getProperties() {
    return {
      autoSave: true,
      mirror: true,
      autoSaveLoader: true,
    };
  }

  createData() {
    const {
      values: {
        fullName, idNumber, age, nationality, dateOfBirth, ...others
      },
    } = this.state;
    return {
      method: 'put',
      data: {
        fullName,
        idNumber,
        age,
        nationality,
        dateOfBirth,
        personalInformation: {
          ...others,
        },
      },
    };
  }

  renderForm = () => {
    const { goNext, submitting, readOnly } = this.props;
    return (
      <div className={`personal-info-form ${readOnly ? 'read-only' : ''}`}>
        <div className="fieldset">
          <Input name="fullName" label={T.full_name} placeholder={T.full_name} />
          <Input name="medicalFileNumber" label={T.medical_file_number} placeholder={T.medical_file_number} />
          <Input name="idNumber" label={T.id_number} placeholder={T.id_number} />
          <Input name="nationality" label={T.nationality} placeholder={T.nationality} />
          <Input name="age" label={T.age} placeholder={T.age} />
          <Input name="dateOfBirth" type="date" label={T.date_of_birth} placeholder={T.date_of_birth} />
          <Input name="location" label={T.location} placeholder={T.location} />
          <Input name="placeOfResidence" label={T.place_of_residence} placeholder={T.place_of_residence} />
          <Input name="mobileNumber" label={T.mobile_number} placeholder={T.mobile_number} />
          <Input name="emergencyNumber1" label={T.emergency_phone_1} placeholder={T.emergency_phone_1} />
          <Input name="emergencyNumber2" label={T.emergency_phone_2} placeholder={T.emergency_phone_2} />
        </div>
        <Button onClick={goNext} disabled={submitting}>
          {T.next}
        </Button>
      </div>
    );
  }
}

PersonalInfoForm.propTypes = {

};

export default connectForm(WithLoading(PersonalInfoForm))('userProfile');
