import React from 'react';
import { shallow } from 'enzyme';
import DevicePanel from 'components/dashboard/device-panel/index';

describe('Device Panel', () => {
  it('Renders with no crashes', () => {
    shallow(<DevicePanel />);
  });
});
