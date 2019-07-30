import React, { Component } from 'react';
import './NavBar.scss';
import logo from '../../assets/images/logo.svg';
import profile from '../../assets/images/profile.svg';
import connectResource from '../../utils/ResourceComponent';
import T from '../../utils/Translation';
import NotificationsList from '../NotificationsList';
import notificationBell from '../../assets/images/notificationBell.svg';
import DropDownMenu from '../DropDownMenu';
import handleNotification from '../../utils/socket';


class NavBar extends Component {
  state = {
    notificationsOpen: false,
  };

  componentDidMount() {
    const { readResource, user: { data: { user } } } = this.props;
    readResource('notifications')();
    handleNotification(user);
  }

  DropDown = ({ user }) => (
    <DropDownMenu>
      <div className="user-profile">
        <img src={profile} alt="" />
        <span>{user.name}</span>
        <i className="fas fa-caret-down" />
      </div>
      <div className="menu">
        <span
          className="item"
          role="presentation"
          onClick={this.logout}>
          {T.logout}
        </span>
      </div>
    </DropDownMenu>
  );

  notificationBell = ({ notifications = [] }) => {
    const count = notifications.reduce((acc, notification) => {
      if (['sent', 'unread'].includes(notification.status)) {
        return acc + 1;
      }
      return acc;
    }, 0);
    const { notificationsOpen } = this.state;
    return (
      <div className="notifications">
        <DropDownMenu
          open={notificationsOpen}
          onVisibilityChange={open => this.setState(
            { notificationsOpen: open },
          )}>
          <div className="notification-bell">
            <span className="badge">{count}</span>
            <img src={notificationBell} alt="" />
          </div>
          <div className="notifications-content">
            <NotificationsList dropdown />
          </div>
        </DropDownMenu>
      </div>
    );
  };

  logout = () => {
    localStorage.clear();
    window.location.replace('/');
  };

  render() {
    const {
      user: { data: { user } }, notifications: { data }, title = '', onHamburgerClick,
    } = this.props;
    const ProfileDropdown = this.DropDown;
    const Notifications = this.notificationBell;
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
        </div>
        <div className="title">
          <h2>{title}</h2>
        </div>
        <div className="menu">
          {
            user && (
              <>
                <Notifications notifications={data || []} />
                <ProfileDropdown user={user} />
              </>
            )
          }
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {

};

export default connectResource(NavBar)({
  resources: ['user', 'notifications'],
});
