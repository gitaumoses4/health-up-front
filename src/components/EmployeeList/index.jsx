import React from 'react';
import T from '../../utils/Translation';
import Tools from '../../utils/Tools';
import ModelTable from '../ModelTable';

const EmployeeList = ModelTable({
  model: 'users',
  columns: {
    name: T.name,
    email: T.email,
    nationality: T.nationality,
    age: T.age,
    joinedOn: T.joined_on,
  },
  renderTable: ({
    id, name, email, createdAt, profile,
  }) => {
    const { nationality, age } = profile || {};
    return {
      name: Tools.s(name),
      email: Tools.s(email),
      nationality: Tools.s(nationality),
      age: Tools.s(age),
      joinedOn: Tools.formatDate(createdAt),
      onClick: ({ history }) => {
        history.push(`/employees/${id}`);
      },
    };
  },
});

export default EmployeeList;
