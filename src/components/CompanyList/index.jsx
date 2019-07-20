import React, { Component } from 'react';
import T from '../../utils/Translation';
import ModelTable from '../ModelTable';
import Tools from '../../utils/Tools';
import './CompanyList.scss';

const CompanyList = ModelTable({
  model: 'companies',
  className: 'company-list',
  cards: true,
  columns: {
    name: T.name,
    email: T.email,
    registration: T.registration_number,
    responsibleName: T.responsible_name,
    noOfEmployees: T.number_of_employees,
    joinedOn: T.joined_on,
    verified: T.verified,
  },
  renderTable: ({
    id, registrationNumber, noOfEmployees,
    responsibleName, verified, createdAt,
    owner: { name, email },
  }) => ({
    name: Tools.s(name),
    email: Tools.s(email),
    registration: Tools.s(registrationNumber),
    responsibleName: Tools.s(responsibleName),
    noOfEmployees: Tools.s(noOfEmployees),
    joinedOn: Tools.formatDate(createdAt),
    verified: (
      <span className={`badge ${verified ? 'verified' : ''}`}>{ verified ? 'Verified' : 'Not Verified '}</span>
    ),
    onClick: ({ history }) => {
      history.push(`/companies/${id}`);
    },
  }),
});

export default CompanyList;
