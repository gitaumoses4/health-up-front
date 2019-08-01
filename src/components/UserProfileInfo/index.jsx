import React, { Component } from 'react';
import T from '../../utils/Translation';
import WithLoading from '../WithLoading';
import connectResource from '../../utils/ResourceComponent';
import UserTabs from '../UserTabs';
import InfoLabel from '../InfoLabel';
import Tools from '../../utils/Tools';
import './UserProfileInfo.scss';
import { allergies, illnesses } from '../Forms/HealthInformationForm';

const Options = ({ options, value = {}, title }) => (
  <InfoLabel title={title}>
    {
      Object.keys(options).map(option => (
        <InfoLabel
          key={Math.random()}
          title={options[option]}
          value={(typeof value[option]) === 'string' ? value[option] : value[option] ? value[`${option}Info`] : T.no}
          inline />
      ))
    }
  </InfoLabel>
);

class UserProfileInfo extends Component {
  componentDidMount() {
    const { userId, readResource } = this.props;
    readResource({
      endpoint: `/users/${userId}`,
    });
  }

  renderPersonalInfo = ({
    profile: {
      fullName, nationality, age,
      idNumber, dateOfBirth,
      personalInformation: {
        medicalFileNumber,
        location, placeOfResidence, mobileNumber,
        emergencyNumber1, emergencyNumber2,
      }, 
    }, 
  }) => (
    <div className="personal-info">
      <InfoLabel title={T.full_name} value={fullName} />
      <InfoLabel title={T.medical_file_number} value={medicalFileNumber} />
      <InfoLabel title={T.id_number} value={idNumber} />
      <InfoLabel title={T.nationality} value={nationality} />
      <InfoLabel title={T.age} value={age} />
      <InfoLabel title={T.date_of_birth} value={Tools.formatDate(dateOfBirth)} />
      {/* <InfoLabel title={T.location} value={location} /> */}
      <InfoLabel title={T.place_of_residence} value={placeOfResidence} />
      <InfoLabel title={T.mobile_number} value={mobileNumber} />
      <InfoLabel title={T.emergency_phone_1} value={emergencyNumber1} />
      <InfoLabel title={T.emergency_phone_2} value={emergencyNumber2} />
    </div>
  );


  renderHealthInfo = ({
    profile: {
      healthInformation: {
        bloodType, smoker, drugsUsed,
        operations, operationsHad, familyHistory,
        currentIllness, allergies: allergiesValue, otherAllergies,
      }, 
    }, 
  }) => (
    <div className="health-info">
      <InfoLabel title={T.blood_type} value={bloodType} />
      <InfoLabel title={T.are_you_a_smoker} value={smoker} />
      <InfoLabel title={T.drugs_used} value={drugsUsed} />
      <InfoLabel title={T.have_you_had_operations} value={operations === 'yes' ? operationsHad : T.no} />
      <Options value={familyHistory} options={illnesses} title={T.family_history} />
      <Options value={currentIllness} options={illnesses} title={T.current_illnesses} />
      <Options
        value={{
          ...allergiesValue,
          others: allergiesValue && allergiesValue.others ? otherAllergies : T.no, 
        }}
        options={allergies}
        title={T.are_you_allergic_to} />
    </div>
  );

  renderGeneralInfo = ({
    profile: {
      generalInformation: {
        bloodType,
        height,
        weight,
      },
    },
  }) => (
    <div>
      <InfoLabel title={T.blood_type} value={bloodType} />
      <InfoLabel title={T.height} value={height} />
      <InfoLabel title={T.weight} value={weight} />
    </div>
  );

  render() {
    const { data: { user } } = this.props;
    const PersonalInfo = this.renderPersonalInfo;
    const HealthInfo = this.renderHealthInfo;
    const GeneralInfo = this.renderGeneralInfo;
    const defaultProfile = {
      healthInformation: {
        allergies: {},
        familyHistory: {},
        currentIllness: {},
      },
      personalInformation: {},
      generalInformation: {},
    };
    const { profile } = user || {};
    return (
      <div className="user-profile-info">
        {
          user && (
            <UserTabs>
              <PersonalInfo profile={profile || defaultProfile} />
              <HealthInfo profile={profile || defaultProfile} />
              <GeneralInfo profile={profile || defaultProfile} />
            </UserTabs>
          )
        }
      </div>
    );
  }
}

UserProfileInfo.propTypes = {

};

export default connectResource(WithLoading(UserProfileInfo, 'loading'))({
  resources: ['userInformation'],
  setToProps: true,
});
