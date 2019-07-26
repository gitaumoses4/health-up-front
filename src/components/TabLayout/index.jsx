import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TabLayout.scss';

class TabLayout extends Component {
  state = {
    currentTab: 0,
    currentHeight: 2000000,
  };

  tabLayout = React.createRef();

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

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { current: element } = this.tabLayout;
    const { currentHeight } = this.state;
    const currentTab = element.querySelector('.swipeable-tab.current');
    const { height } = currentTab.getBoundingClientRect();

    if (height !== currentHeight || currentHeight === 2000000) {
      this.setState({ currentHeight: height });
    }
  }

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
    const { tabs, children } = this.props;
    const { currentTab, currentHeight } = this.state;
    return (
      <div className="tab-layout" ref={this.tabLayout}>
        <div className="tabs">
          {
            tabs.map(this.renderTab)
          }
        </div>
        <div className="tab-content">
          <div className="swipeable-tabs" style={{ height: `${currentHeight}px` }}>
            {
              children.map((child, index) => {
                const translation = (index - currentTab) * 120;
                return (
                  <React.Fragment key={index}>
                    <div
                      className={`swipeable-tab ${index === currentTab ? 'current' : ''}`}
                      style={{
                        transform: `translateX(${translation}%)`,
                      }}>
                      <div className="swipeable-tab__content">
                        { child }
                      </div>
                    </div>
                  </React.Fragment>
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
