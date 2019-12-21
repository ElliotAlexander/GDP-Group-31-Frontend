import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import DeviceGrid from 'components/dashboard/device-panel/DeviceGrid';

describe('HomePanelGrid Component', () => {
  let shallow;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow({ dive: true });
    wrapper = shallow(<DeviceGrid />);
  });

  it('Renders with no crash', () => {
    shallow(<DeviceGrid />);
  });

  describe('Style sheet applied', () => {
    it('Renders grid', () => {
      expect(wrapper.find('.layout')).toHaveLength(1);
    });
  });
});
