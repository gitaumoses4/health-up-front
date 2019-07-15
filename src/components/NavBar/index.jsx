import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NavBar.scss';
import logo from '../../assets/images/logo.svg';
import profile from '../../assets/images/profile.svg';
import connectResource from '../../utils/ResourceComponent';
import T from '../../utils/Translation';
import DropDownMenu from '../DropDownMenu';


class NavBar extends Component {
  componentDidMount() {
  }

  DropDown = ({ user }) => (
    <DropDownMenu>
      <div className="user-profile">
        <img src={profile} alt="" />
        <span>{user.name}</span>
        <i className="fas fa-caret-down" />
      </div>
      <div className="menu">
        <span className="item" role="presentation" onClick={this.logout}>Logout</span>
      </div>
    </DropDownMenu>
  );

  logout = () => {
    localStorage.clear();
    window.location.replace('/');
  };

  render() {
    const { user: { data: { user } }, title = '', onHamburgerClick } = this.props;
    const ProfileDropdown = this.DropDown;
    return (
      <div className="nav-bar">
        <div className="logo">
          {
            onHamburgerClick && (
              <span onClick={onHamburgerClick} className="hamburger" role="presentation">
                <i className="fas fa-bars" />
              </span>
            )
          }
          <img src={logo} alt="" />
          <h3>{T.health_up}</h3>
        </div>
        <div className="title">
          <h2>{title}</h2>
        </div>
        <div className="menu">
          {
            user && <ProfileDropdown user={user} />
          }
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {

};

export default connectResource(NavBar)({
  resources: ['user'],
});
