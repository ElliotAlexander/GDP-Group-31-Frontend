import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from 'components/dashboard/dashboard/Dashboard.jsx';

describe('Dashboard Testing', () => {
  it('renders without crashing', () => {
    shallow(<Dashboard />);
  });
});
