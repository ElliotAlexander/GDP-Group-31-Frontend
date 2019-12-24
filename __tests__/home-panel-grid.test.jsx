import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import HomePanelGrid from 'components/home-panel/home-panel-grid';

describe('HomePanelGrid Component', () => {
  let shallow;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow({ dive: true });
    wrapper = shallow(<HomePanelGrid />);
  });

  it('renders without crashing', () => {
    shallow(<HomePanelGrid />);
  });

  describe('Styles', () => {
    it('renders the layout for the grid', () => {
      expect(wrapper.find('.layout')).toHaveLength(1);
    });
  });
});
