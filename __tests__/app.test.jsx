import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import App from '../src/App.jsx';

describe('<App />', () => {
  const mockStore = configureMockStore([]);

  const store = mockStore({
    device: {},
  });

  const wrap = shallow(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  it('renders', () => {
    expect(wrap).toBeTruthy();
  });
});
