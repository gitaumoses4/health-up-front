import React, { Component } from 'react';
import './Swipeable.scss';
import SwipeableItem from './SwipeableItem';

class SwipeContainer extends Component {
  state = {
    items: {},
  }

  onOpen = (index) => {
    this.setState(({ items }) => ({
      items: Object.keys(items).reduce((acc, c, cur) => ({
        ...acc,
        [cur]: index === cur,
      }), {}),
    }));
  };

  componentDidMount() {
    const { children } = this.props;
    this.setState({
      items: children.reduce((acc, child, index) => (
        { ...acc, [index]: false }), {}),
    });
  }

  render() {
    const { children } = this.props;
    const { items } = this.state;
    return (
      <div className="swipe-container">
        {
          children.map((child, index) => (
            <SwipeableItem
              close={!items[index]}
              key={index}
              onOpen={() => this.onOpen(index)}>
              {child}
            </SwipeableItem>
          ))
        }
      </div>
    );
  }
}

SwipeContainer.propTypes = {};

SwipeContainer.defaultProps = {};

export default SwipeContainer;
