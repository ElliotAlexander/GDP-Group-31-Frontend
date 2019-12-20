import React from 'react';
import { shallow } from 'enzyme';
import HomePanel from 'components/home-panel/index';

describe('HomePanel Testing', () => {
  it('renders without crashing', () => {
    shallow(<HomePanel />);
  });
});
