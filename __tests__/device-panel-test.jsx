import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import DevicePanel from 'components/dashboard/device-panel/DevicePanel.jsx';
import configureMockStore from 'redux-mock-store';

describe('Device Panel', () => {
  let store;
  let wrapper;

  const mockStore = configureMockStore([]);

  beforeEach(() => {
    store = mockStore({
      device: {},
    });
    wrapper = shallow(
      <Provider store={store}>
        <DevicePanel />
      </Provider>,
    );
  });

  it('Renders with no crashes', () => {
    expect(wrapper).toBeTruthy();
  });
});
