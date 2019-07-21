import React, { Component } from 'react';
import PropTypes from 'prop-types';
import T from '../../utils/Translation';
import connectResource from '../../utils/ResourceComponent';
import './CompanyInfo.scss';
import EmployeeList from '../EmployeeList';
import InfoLabel from '../InfoLabel';
import Button from '../Button';
import download from '../../assets/images/download.svg';
import DropDownMenu from '../DropDownMenu';

class CompanyInfo extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    const { readResource, match: { params: { id } } } = this.props;
    readResource({
      endpoint: `/companies/${id}`,
    });
  }

  onVisibilityChange = (open = false) => this.setState({ open });

  handleVerify = () => {
    this.onVisibilityChange(false);
    const { updateResource, match: { params: { id } } } = this.props;

    updateResource({
      endpoint: `/companies/${id}/verify`,
    });
  };

  renderVerified = ({ verified }) => {
    const { open } = this.state;
    return (
      <div>
        {
          verified ? (
            <span className="badge verified">{T.verified}</span>
          ) : (
            <div className="verify">
              <DropDownMenu open={open} onVisibilityChange={this.onVisibilityChange}>
                <Button>{T.verify}</Button>
                <div>
                  <span className="title">
                    {T.are_you_sure_you_want_to_verify}
                  </span>
                  <Button onClick={this.handleVerify}>{T.yes}</Button>
                </div>
              </DropDownMenu>
            </div>
          )
        }
      </div>
    );
  };

  renderCompany = ({
    company,
    company: {
      employees, registrationNumber,
      receipt,
      naturalBusiness, noOfEmployees,
      owner: {
        name,
        email,
      },
    }, loading, history, 
  }) => (
    <div className="company-information">
      <div className="basic-information">
        <div className="company">
          <div className="header">
            <h1>
              <i className="fas fa-building" />
              {`   ${name}`}
            </h1>
            {this.renderVerified(company)}
          </div>
          <div className="info">
            <InfoLabel className="card" title={T.registration_number} value={registrationNumber} />
            <InfoLabel className="card" title={T.email} value={email} />
            <InfoLabel className="card" title={T.natural_business} value={naturalBusiness} />
            <InfoLabel className="card" title={T.number_of_employees} value={noOfEmployees} />
            <InfoLabel className="card clickable receipt" title={T.receipt}>
              <a href={receipt} download="Receipt">
                <img src={download} alt="" />
              </a>
            </InfoLabel>
          </div>
        </div>
      </div>
      <div className="employees">
        <h1>{T.employees}</h1>
        <EmployeeList
          data={{ users: employees }}
          loading={loading}
          cards
          history={history} />
      </div>
    </div>
  );

  render() {
    const { loading, data: { company }, history } = this.props;

    const Company = this.renderCompany;
    return (
      company ? <Company loading={loading} history={history} company={company} /> : null
    );
  }
}

CompanyInfo.propTypes = {

};

export default connectResource(CompanyInfo)({
  resources: ['companyInformation'],
  setToProps: true,
});
