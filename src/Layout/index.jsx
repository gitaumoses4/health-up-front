import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import './Layout.scss';
import connectResource from '../utils/ResourceComponent';
import accountTypes from '../utils/accountTypes';

class Layout extends Component {
  state = {
    sidebarOpen: false,
  };

  sidebar = React.createRef();


  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (e) => {
    const { current } = this.sidebar;
    if (e.target && current && e.target.contains(current)) {
      this.setState({ sidebarOpen: false });
    }
  };

  onHamburgerClick = () => {
    const { sidebarOpen } = this.state;
    this.setState({ sidebarOpen: !sidebarOpen });
  };

  render() {
    const {
      children, data: { user }, match, history,
    } = this.props;

    const { sidebarOpen } = this.state;
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return user ? (
      <div className={`layout-wrapper ${sidebarOpen ? 'sidebarOpen' : ''}`}>
        <NavBar onHamburgerClick={this.onHamburgerClick} />
        <div className="layout-body">
          <div className="layout-wrapper__sidebar" ref={this.sidebar}>
            <SideBar type={user.accountType} match={match} history={history} />
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
