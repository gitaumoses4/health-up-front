import React, { Component } from 'react';
import PropTypes from 'prop-types';
import T from '../../utils/Translation';
import Form from '../../utils/Forms';
import Input from '../../utils/Forms/Input';
import './PersonalInfoForm.scss';
import Button from '../Button';

class PersonalInfoForm extends Form {
  renderForm = () => (
    <div className="personal-info-form">
      <div className="fieldset">
        <Input
          name="fullName"
          placeholder={T.full_name} />
        <Input
          name="medicalFileNumber"
          placeholder={T.medical_file_number}
        />
        <Input
          name="idNumber"
          placeholder={T.id_number}
        />
        <Input
          name="nationality"
          placeholder={T.nationality}
        />
        <Input
          name="age"
          placeholder={T.age}
        />
        <Input
          name="dateOfBirth"
          placeholder={T.date_of_birth}
        />
        <Input
          name="location"
          placeholder={T.location}
        />
        <Input
          name="placeOfResidence"
          placeholder={T.place_of_residence}
        />
        <Input
          name="mobileNumber"
          placeholder={T.mobile_number}
        />
        <Input
          name="emergencyNumber1"
          placeholder={T.emergency_phone_1}
        />
        <Input
          name="emergencyNumber2"
          placeholder={T.emergency_phone_2}
        />
      </div>
      <Button>
          Next
      </Button>
    </div>
  )
}

PersonalInfoForm.propTypes = {

};

export default PersonalInfoForm;
