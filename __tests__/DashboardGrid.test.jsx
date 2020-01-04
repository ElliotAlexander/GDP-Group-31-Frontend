import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import DashboardGrid from 'components/home/DashboardGrid';

describe('Dashboard Grid Component', () => {
  let shallow;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow({ dive: true });
    wrapper = shallow(<DashboardGrid />);
  });

  it('renders without crashing', () => {
    shallow(<DashboardGrid />);
  });

  describe('Styles', () => {
    it('renders the layout for the grid', () => {
      expect(wrapper.find('.layout')).toHaveLength(1);
    });
  });
});
