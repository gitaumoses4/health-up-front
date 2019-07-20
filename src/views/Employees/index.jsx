import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Layout from '../../Layout';
import EmployeeList from '../../components/EmployeeList';
import T from '../../utils/Translation';
import Button from '../../components/Button';
import './Employees.scss';
import connectResource from '../../utils/ResourceComponent';

class Employees extends Component {
  componentDidMount() {
    const { readResource } = this.props;
    readResource('employees')();
  }

  render() {
    const { employees, history } = this.props;
    return (
      <Layout {...this.props}>
        <div className="company-employees">
          <div className="header">
            <h1>{T.employees}</h1>
            <Button>
              <Link to="/employees/new">
                {T.add}
              </Link>
            </Button>
          </div>
          <div>
            <EmployeeList {...employees} history={history} />
          </div>
        </div>
      </Layout>
    );
  }
}

Employees.propTypes = {

};

export default connectResource(Employees)({
  resources: ['employees'],
});
