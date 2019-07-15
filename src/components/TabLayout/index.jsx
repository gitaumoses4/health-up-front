import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TabLayout.scss';

class TabLayout extends Component {
  state = {
    currentTab: 0,
  };

  changeTab = (index) => {
    this.setState({ currentTab: index });
  };

  renderTab = ({ icon, title }, index) => {
    const { currentTab } = this.state;
    return (
      <div
        className={`tab ${currentTab === index ? 'active' : ''}`} key={Math.random()} role="presentation"
        onClick={() => this.changeTab(index)}>
        <span><img src={icon} alt="" /></span>
        <span className="title">{title}</span>
      </div>
    );
  };

  render() {
    const { tabs, children } = this.props;
    const { currentTab } = this.state;
    return (
      <div className="tab-layout">
        <div className="tabs">
          {
            tabs.map(this.renderTab)
          }
        </div>
        <div className="tab-content">
          {
            children[currentTab]
          }
        </div>
      </div>
    );
  }
}

TabLayout.propTypes = {

};

export default TabLayout;
