import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../Layout';
import T from '../../utils/Translation';
import Button from '../../components/Button';
import './Ambulances.scss';
import connectResource from '../../utils/ResourceComponent';
import ModelTable from '../../components/ModelTable';
import Tools from '../../utils/Tools';

const AmbulanceMenList = ModelTable({
  model: 'ambulances',
  columns: {
    name: T.name,
    email: T.email,
    joinedOn: T.joined_on,
  },
  renderTable: ({
    name, email, createdAt,
  }) => ({
    name: Tools.s(name),
    email: Tools.s(email),
    joinedOn: Tools.formatDate(createdAt),
  }),
});

class Ambulances extends Component {
  componentDidMount() {
    const { readResource } = this.props;
    readResource('ambulances')();
  }

  render() {
    const { ambulances, history } = this.props;
    return (
      <Layout {...this.props}>
        <div className="company-employees">
          <div className="header">
            <h1>{T.ambulance_men}</h1>
            <Button>
              <Link to="/ambulances/new">
                {T.add}
              </Link>
            </Button>
          </div>
          <div>
            <AmbulanceMenList {...ambulances} history={history} />
          </div>
        </div>
      </Layout>
    );
  }
}

Ambulances.propTypes = {

};

export default connectResource(Ambulances)({
  resources: ['ambulances'],
});
