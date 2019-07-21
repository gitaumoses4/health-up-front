import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BottomSheet.scss';

class BottomSheet extends Component {
  state = {
    open: false,
    offsetY: 0,
  };

  overlay = React.createRef();

  componentDidMount() {
    this.updateOpenState(this.props);
    document.addEventListener('click', this.handleOutsideClick);
  }


  componentWillReceiveProps(nextProps, nextContext) {
    this.updateOpenState(nextProps);
  }


  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (e) => {
    const { current } = this.overlay;
    if (current && e.target.contains(current)) {
      this.toggleState(false);
    }
  };

  updateOpenState = (props) => {
    const { open } = this.state;
    if (open !== props.open) {
      this.toggleState(props.open);
    }
  };

  toggleState = (open) => {
    const { open: stateOpen } = this.state;
    const { onClose } = this.props;
    if (stateOpen !== open) {
      this.setState({ open });
      if (!open) {
        onClose();
      }
    }
  };

  render() {
    const { children } = this.props;
    const { open } = this.state;
    // document.body.style.overflow = open ? 'hidden' : '';

    return (
      <div className={`bottom-sheet ${open ? 'open' : ''}`}>
        <div
          role="presentation"
          className="overlay" ref={this.overlay}
          onClick={() => this.toggleState(false)} />
        <div className="bottom-sheet__content">
          <i className="fas fa-times close" role="presentation" onClick={() => this.toggleState(false)} />
          <div className="bottom-sheet__content__content">
            { children }
          </div>
        </div>
      </div>
    );
  }
}

BottomSheet.propTypes = {
  onClose: PropTypes.func,
};

BottomSheet.defaultProps = {
  onClose: () => {},
};

export default BottomSheet;
