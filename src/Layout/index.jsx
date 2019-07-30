import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import './Layout.scss';
import connectResource from '../utils/ResourceComponent';
import accountTypes, { COMPANY } from '../utils/accountTypes';
import NotVerified from '../components/NotVerified';

class LayoutComponent extends Component {
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
      localStorage.setItem('sidebar', width > 600 ? false : 'true');
    }
  };

  onHamburgerClick = () => {
    const { sidebarOpen } = this.state;
    this.setState({ sidebarOpen: !sidebarOpen });
    const width = document.body.clientWidth;
    localStorage.setItem('sidebar', width > 600 ? sidebarOpen : 'true');
  };


  renderContent = () => {
    const { data: { user }, children } = this.props;
    if (user.accountType === COMPANY) {
      const { company } = user;
      if (company.verified) {
        return children;
      }
      return <NotVerified />;
    }
    return children;
  };

  renderHeader = (header) => {
    if (header.constructor === String) {
      return (<h2>{header}</h2>);
    }
    return header;
  };

  render() {
    const {
      data: { user }, match, history, header,
    } = this.props;

    const width = document.body.clientWidth;
    const { sidebarOpen } = this.state;
    document.body.style.overflow = sidebarOpen && width < 600 ? 'hidden' : '';
    return user ? (
      <div className={`layout-wrapper ${sidebarOpen ? 'sidebarOpen' : ''}`}>
        <div className="navigation">
          <NavBar
            onHamburgerClick={width < 600 && this.onHamburgerClick}
          />
        </div>
        <div className="layout-body">
          <div className="layout-wrapper__sidebar" ref={this.sidebar}>
            <SideBar
              type={user.accountType}
              onHamburgerClick={this.onHamburgerClick}
              match={match}
              collapsed={width > 600 && sidebarOpen}
              history={history} />
          </div>
          <div className="content">
            {
              header && (
                <div className="content__header">
                  <span
                    role="presentation"
                    onClick={history.goBack}
                  >
                    <i className="fas fa-arrow-left" />
                  </span>
                  {header && this.renderHeader(header)}
                </div>
              )
            }
            { this.renderContent() }
          </div>
        </div>
      </div>
    ) : null;
  }
}

LayoutComponent.propTypes = {

};

const Layout = connectResource(LayoutComponent)({
  resources: ['user'],
  setToProps: true,
});

export default Layout;
