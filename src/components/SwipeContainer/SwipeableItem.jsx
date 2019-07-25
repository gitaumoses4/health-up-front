import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Swipeable } from 'react-swipeable';

class SwipeableItem extends Component {
  item = React.createRef();

  onSwipedRight = (e) => {
    this.close();
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.close) {
      this.close();
    }
  }

  close = () => {
    const { current: elem } = this.item;
    elem.style.left = '0px';
    elem.classList.remove('open');
  };


  onSwipedLeft= (e) => {
    const { current: elem } = this.item;
    elem.style.left = '-50px';
    elem.classList.add('open');
    const { onOpen } = this.props;
    onOpen();
  };

  onSwiping = (e) => {
    const { deltaX } = e;
    const { current: elem } = this.item;
    elem.style.position = 'relative';
    elem.classList.remove('open');
    if (Math.abs(deltaX) < 100) {
      elem.style.left = `${-deltaX}px`;
    }
  };

  render() {
    const { children } = this.props;
    return (
      <div ref={this.item} className="swipeable">
        <Swipeable
          onSwipedLeft={this.onSwipedLeft}
          onSwipedRight={this.onSwipedRight}
          onSwiping={this.onSwiping}
          trackMouse>
          { children }
        </Swipeable>
        <div className="actions right">
          <i
            className="fas fa-trash-alt delete action"
          />
        </div>
      </div>
    );
  }
}

SwipeableItem.propTypes = {};

SwipeableItem.defaultProps = {};

export default SwipeableItem;
