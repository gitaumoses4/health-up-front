import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import './Layout.scss';
import connectResource from '../utils/ResourceComponent';
import accountTypes from '../utils/accountTypes';

class Layout extends Component {
  state = {
    sidebarOpen: localStorage.getItem('sidebar') === 'false',
  };

  sidebar = React.createRef();


  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (e) => {
    const { current } = this.sidebar;
    const width = document.body.clientWidth;
    if (e.target && current && e.target.contains(current) && width < 600) {
      this.setState({ sidebarOpen: false });
    }
  };

  onHamburgerClick = () => {
    const { sidebarOpen } = this.state;
    this.setState({ sidebarOpen: !sidebarOpen });
    const width = document.body.clientWidth;
    localStorage.setItem('sidebar', width > 600 ? sidebarOpen : 'true');
  };

  render() {
    const {
      children, data: { user }, match, history,
    } = this.props;

    const width = document.body.clientWidth;
    const { sidebarOpen } = this.state;
    document.body.style.overflow = sidebarOpen && width < 600 ? 'hidden' : '';
    return user ? (
      <div className={`layout-wrapper ${sidebarOpen ? 'sidebarOpen' : ''}`}>
        <NavBar onHamburgerClick={this.onHamburgerClick} />
        <div className="layout-body">
          <div className="layout-wrapper__sidebar" ref={this.sidebar}>
            <SideBar
              type={user.accountType}
              match={match}
              collapsed={width > 600 && sidebarOpen}
              history={history} />
          </div>
          <div className="content">
            { children }
          </div>
        </div>
      </div>
    ) : null;
  }
}

Layout.propTypes = {

};

export default connectResource(Layout)({
  resources: ['user'],
  setToProps: true,
});
