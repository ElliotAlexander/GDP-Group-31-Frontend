import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from 'components/home/Dashboard';

describe('Dashboard Testing', () => {
  it('renders without crashing', () => {
    shallow(<Dashboard />);
  });
});
