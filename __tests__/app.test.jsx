import React from 'react';
import { shallow } from 'enzyme';

import App from '../src/App.jsx';

describe('<App />', () => {
  const wrap = shallow(<App />);

  it('renders', () => {
    expect(wrap).toBeTruthy();
  });
});
