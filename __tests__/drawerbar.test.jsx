import React from 'react';
import { shallow } from 'enzyme';
import DrawerBar from 'components/dashboard/dashboard/DrawerBar.jsx';

describe('DrawerBar Testing', () => {
  it('renders without crashing', () => {
    shallow(<DrawerBar />);
  });
});

const fnClick = jest.fn();

describe('click events', () => {
  it('button click should show menu', () => {
    // replace actual function with mock function
    const wrapper = shallow(<DrawerBar onClick={fnClick} />);
    const icnButton1 = wrapper.find('#closeBtn');
    const icnButton2 = wrapper.find('#icnBtn');
    expect(icnButton1.exists()).toEqual(true);
    expect(icnButton2.exists()).toEqual(false);
    icnButton1.simulate('click');
    // simulate a click
    // check if function was called
  });
});
