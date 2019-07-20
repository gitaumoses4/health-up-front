import React, { Component } from 'react';
import Empty from '../Empty';
import T from '../../utils/Translation';
import WithLoading from '../WithLoading';
import Table from '../Table';
import Tools from '../../utils/Tools';

class EmployeeList extends Component {
  renderEmpty = ({ loading, employees }) => (
    loading || (!employees || !employees.length) ? (
      <Empty />
    ) : this.renderItems(employees)
  );

  renderItems = (employees) => {
    const { history } = this.props;
    return (
      <Table
        columns={{
          name: T.name,
          email: T.email,
          nationality: T.nationality,
          age: T.age,
          joinedOn: T.joined_on,
        }}
        rows={employees}
      >
        {({
          id, name, email, createdAt, profile,
        }) => {
          const { nationality, age } = profile || {};
          return {
            name: Tools.s(name),
            email: Tools.s(email),
            nationality: Tools.s(nationality),
            age: Tools.s(age),
            joinedOn: Tools.formatDate(createdAt),
            onClick: () => {
              history.push(`/employees/${id}`);
            },
          };
        }}
      </Table>
    );
  };

  render() {
    const { data: { users }, loading } = this.props;
    const Items = this.renderEmpty;
    return (
      <div className="employees-list">
        <Items loading={loading} employees={users} />
      </div>
    );
  }
}

EmployeeList.propTypes = {

};

export default WithLoading(EmployeeList);
