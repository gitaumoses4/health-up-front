import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TabLayout.scss';

class TabLayout extends Component {
  state = {
    currentTab: 0,
  };

  componentDidMount() {
    this.updateTab(this.props);
  }

  changeTab = (index) => {
    const { onTabChange } = this.props;
    this.setState({ currentTab: index }, () => {
      const { currentTab } = this.state;
      onTabChange(currentTab);
    });
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.updateTab(nextProps);
  }

  updateTab = (props) => {
    const { currentTab } = this.state;
    if (currentTab !== props.currentTab) {
      this.setState({ currentTab: +props.currentTab });
    }
  };

  renderTab = ({ icon, title }, index) => {
    const { currentTab } = this.state;
    return (
      <div
        className={`tab ${currentTab === index ? 'active' : ''}`}
        key={Math.random()}
        role="presentation"
        onClick={() => this.changeTab(index)}>
        <span><img src={icon} alt="" /></span>
        <span className="title">{title}</span>
      </div>
    );
  };

  render() {
    const { tabs, children, height = 700 } = this.props;
    const { currentTab } = this.state;
    return (
      <div className="tab-layout">
        <div className="tabs">
          {
            tabs.map(this.renderTab)
          }
        </div>
        <div className="tab-content">
          <div className="swipeable-tabs" style={{ height: `${height}px` }}>
            {
              children.map((child, index) => {
                const translation = (index - currentTab) * 120;
                return (
                  <div
                    key={index}
                    className="swipeable-tab"
                    style={{
                      transform: `translateX(${translation}%)`,
                    }}>
                    <div className="swipeable-tab__content">
                      { child }
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

TabLayout.propTypes = {

};

export default TabLayout;
