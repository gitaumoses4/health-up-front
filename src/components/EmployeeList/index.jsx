import React from 'react';
import T from '../../utils/Translation';
import Tools from '../../utils/Tools';
import ModelTable from '../ModelTable';
import WithLoading from '../WithLoading';

const EmployeeList = ModelTable({
  model: 'users',
  columns: {
    name: T.name,
    email: T.email,
    idNumber: T.id_number,
    age: T.age,
    joinedOn: T.joined_on,
  },
  renderTable: ({
    id, name, email, idNumber, createdAt, profile,
  }) => {
    const { age } = profile || {};
    return {
      name: Tools.s(name),
      email: Tools.s(email),
      idNumber: Tools.s(idNumber),
      age: Tools.s(age),
      joinedOn: Tools.formatDate(createdAt),
      onClick: ({ history }) => {
        history.push(`/employees/${id}`);
      },
    };
  },
});

export default WithLoading(EmployeeList, 'loading');
