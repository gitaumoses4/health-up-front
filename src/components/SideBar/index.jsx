import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SideBar.scss';
import metadata from './metadata';
import Icon from '../Icon';

class SideBar extends Component {
  state = {
    items: {

    },
  };

  componentDidMount() {
    this.initialize();
  }

  initialize = () => {
    const { type, match } = this.props;
    const items = metadata[type];

    this.setState({
      items: Object.keys(items).reduce((acc, cur) => ({
        ...acc,
        [cur]: {
          ...items[cur],
          active: false,
        },
      }), {}),
    });

    const currentLink = match.path;
    let found = Object.keys(items).find(item => new RegExp(`^${items[item].link}.*`).test(currentLink));

    if (!found) {
      found = Object.keys(items).find(item => items[item].active);
    }
    this.setState(({ items: prevItems }) => ({
      items: {
        ...prevItems,
        [found]: {
          ...prevItems[found],
          active: true,
        },
      },
    }));
  }

  renderItem = ({
    label, link, active, icon,
  }) => (
    <div className={`side-bar__item ${active ? 'active' : ''}`} key={Math.random()}>
      <Link to={link}>
        <img src={icon} alt="" />
        <span>{label}</span>
      </Link>
    </div>
  );

  render() {
    const { items } = this.state;
    const { collapsed, onHamburgerClick } = this.props;
    return (
      <div className={`side-bar ${collapsed ? 'collapsed' : ''}`}>
        <span onClick={onHamburgerClick} className="hamburger" role="presentation">
          <Icon
            icon={{ collapsed: 'fas fa-bars', open: 'fas fa-times' }}
            value={collapsed ? 'collapsed' : 'open'} />
        </span>
        {
          Object.keys(items).map(item => this.renderItem(items[item]))
        }
      </div>
    );
  }
}

SideBar.propTypes = {

};

export default SideBar;
