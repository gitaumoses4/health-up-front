import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DropdownMenu.scss';

class DropDownMenu extends Component {
  state = {
    open: false,
  };

  dropdown = React.createRef();

  check = React.createRef();

  trigger = React.createRef();

  content = React.createRef();


  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
    document.addEventListener('scroll', this.handleOutsideClick);
    const { open } = this.props;
    this.setState({ open: !!open });
  }


  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ open: !!nextProps.open });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
    document.removeEventListener('scroll', this.handleOutsideClick);
  }

  toggleDropdown = (e) => {
    this.setState(({ open }) => ({ open: !open }), () => {
      const { onVisibilityChange } = this.props;
      const { open } = this.state;
      onVisibilityChange(open);
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { current: currentTrigger } = this.trigger;
    const { current: currentContent } = this.content;


    const before = this.dropdown.current.querySelector('.dropdown-content:before');
  }


  handleOutsideClick = (e) => {
    const { target } = e;
    const { current } = this.dropdown;
    const { current: checkCurrent } = this.check;
    if (current) {
      if (!current.contains(target) && current.contains(checkCurrent)) {
        this.setState({ open: false });
        const { onVisibilityChange } = this.props;
        onVisibilityChange(false);
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
          ref={this.trigger}
          onClick={this.toggleDropdown}>
          {children[0]}
        </span>
        {open && <span ref={this.check} />}
        <div className={`dropdown-content ${open ? 'open' : ''}`} ref={this.content}>
          {children[1]}
        </div>
      </div>
    );
  }
}

DropDownMenu.propTypes = {
  onVisibilityChange: PropTypes.func,
};

DropDownMenu.defaultProps = {
  onVisibilityChange: () => {},
};

export default DropDownMenu;
