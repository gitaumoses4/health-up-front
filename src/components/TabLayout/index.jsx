import React, { Component } from 'react';
import './TabLayout.scss';


class TabLayout extends Component {
  state = {
    currentTab: 0,
    currentHeight: 2000000,
  };

  tabLayout = React.createRef();

  componentDidMount() {
    this.updateTab(this.props);
    this.fixHeight();

    const tabs = this.tabLayout.current.querySelectorAll('.swipeable-tab');

    const observer = new MutationObserver((mutations) => {
      const element = mutations[0].target;
      const w = element.clientWidth;
      const h = element.clientHeight;
      const event = new CustomEvent('resize', { detail: { width: w, height: h } });
      tabs.forEach(tab => tab.dispatchEvent(event));
    });

    tabs.forEach((tab) => {
      observer.observe(tab, {
        attributes: true,
        attributeOldValue: true,
        subtree: true,
        childList: true,
      });
      tab.addEventListener('resize', () => {
        this.fixHeight();
      });
    });
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
    this.fixHeight();
  }

  fixHeight = () => {
    const { current: element } = this.tabLayout;
    if (element) {
      const { currentHeight } = this.state;
      const currentTab = element.querySelector('.swipeable-tab.current .swipeable-tab__content');
      const height = currentTab.clientHeight;

      if (height !== currentHeight || currentHeight === 2000000) {
        this.setState({ currentHeight: height });
      }
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
                const translation = (index - currentTab) * 120 * (process.env.REACT_APP_LANGUAGE === 'ar' ? -1 : 1);
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
