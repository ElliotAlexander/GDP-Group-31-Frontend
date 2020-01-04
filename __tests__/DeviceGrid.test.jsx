import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import DeviceGrid from 'components/device/DeviceGrid';

import configureMockStore from 'redux-mock-store';

describe('HomePanelGrid Component', () => {
  let wrapper;
  let store;

  const mockStore = configureMockStore([]);

  const mockDevice = {
    device: {
      uuid: 'test',
    },
  };

  beforeEach(() => {
    store = mockStore({
      device: {},
    });
    wrapper = shallow(
      <Provider store={store}>
        <DeviceGrid device={mockDevice} />
      </Provider>,
    );
  });

  describe('Component renders, ', () => {
    it('Renders', () => {
      expect(wrapper).toBeDefined();
    });
  });

  describe('Style sheet applied', () => {
    it('Renders grid', () => {
      // See https://github.com/airbnb/enzyme/issues/2282
      // and
      // https://github.com/airbnb/enzyme/issues/2202
      // Not sure there's a better solution to this (as of Dec 2019)
      expect(
        wrapper
          .dive()
          .dive()
          .dive()
          .find('.layout'),
      ).toHaveLength(1);
    });
  });
});
