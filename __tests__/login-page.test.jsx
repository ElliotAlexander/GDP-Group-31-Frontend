import React from 'react';
import { mount } from 'enzyme';
import { LoginPage } from '../src/components/login-page/index.jsx';

describe('Login Page', () => {
  const wrap = mount(<LoginPage />);

  it('renders successfully', () => {
    expect(wrap.exists()).toBe(true);
  });
});
