import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import searchIcon from '../../../assets/images/search.svg';
import connectResource from '../../../utils/ResourceComponent';
import EmployeeList from '../../../components/EmployeeList';
import T from '../../../utils/Translation';


class AmbulanceManDashboard extends Component {
  state = {
    search: '',
  };

  constructor(props) {
    super(props);
    this.debouncedSearch = _.debounce(this.searchUser, 1000);
  }

  searchUser = () => {
    const { readResource } = this.props;
    const { search } = this.state;
    readResource('searchUsers')({
      query: {
        search,
      },
    });
  };


  onInputChange = (e) => {
    this.setState({ search: e.target.value }, this.debouncedSearch);
  };

  render() {
    const { searchUsers, history } = this.props;
    const { search } = this.state;
    return (
      <div className="ambulance-man-dashboard">
        <h1>Search for User</h1>
        <div className="search-form">
          <div className="form">
            <input type="text" value={search} placeholder="Search..." onChange={this.onInputChange} />
          </div>
          <EmployeeList
            {...searchUsers}
            emptyImage={searchIcon}
            emptyMessage={T.search_message}
            history={history} />
        </div>
      </div>
    );
  }
}

AmbulanceManDashboard.propTypes = {

};

export default connectResource(AmbulanceManDashboard)({
  resources: ['searchUsers'],
});
