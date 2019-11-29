import React from 'react';
import { mount } from 'enzyme';
import { LoginPageWithStyles } from '../src/components/login-page/index.jsx';

describe('Login Page', () => {
  const wrap = mount(<LoginPageWithStyles />);

  it('renders successfully', () => {
    expect(wrap.exists()).toBe(true);
  });
});
