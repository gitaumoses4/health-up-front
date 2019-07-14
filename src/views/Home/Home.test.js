import React from 'react';
import {mount} from 'enzyme';
import {BrowserRouter} from 'react-router-dom';
import Home from './index';

describe('Renders the <Home/> component', () => {
  const wrapper = mount(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  it('should render without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });
});
