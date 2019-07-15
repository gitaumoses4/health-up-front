import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DropdownMenu.scss';

class DropDownMenu extends Component {
  state = {
    open: false,
  };

  dropdown = React.createRef();

  toggleDropdown = () => {
    this.setState(({ open }) => ({ open: !open }));
  };

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }


  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (e) => {
    const { target } = e;
    const { current } = this.dropdown;
    if (current) {
      if (!current.contains(target)) {
        this.setState({ open: false });
      }
    }
  };

  render() {
    const { children } = this.props;
    const { open } = this.state;
    return (
      <div className="dropdown-menu" ref={this.dropdown}>
        <span
          role="presentation"
          className="trigger"
          onClick={this.toggleDropdown}>
          {children[0]}
        </span>
        <div className={`dropdown-content ${open ? 'open' : ''}`}>
          {children[1]}
        </div>
      </div>
    );
  }
}

DropDownMenu.propTypes = {

};

export default DropDownMenu;
