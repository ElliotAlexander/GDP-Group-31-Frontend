import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { LoginPageWithStyles } from '../src/components/login-page/index.jsx';

describe('Login Page Component', () => {
  let shallow;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow({ dive: true });
    wrapper = shallow(<LoginPageWithStyles />);
  });

  describe('Styles', () => {
    it('renders style for main login panel', () => {
      expect(wrapper.find('.LoginPage-paper-1')).toHaveLength(1);
    });

    it('renders style for avatar icon', () => {
      expect(wrapper.find('.LoginPage-avatar-2')).toHaveLength(1);
    });

    it('renders style for form', () => {
      expect(wrapper.find('.LoginPage-form-3')).toHaveLength(1);
    });

    it('renders style for submit button', () => {
      expect(wrapper.find('.LoginPage-submit-4')).toHaveLength(1);
    });
  });

  describe('Login panel box', () => {
    it('renders a username textfield', () => {
      expect(wrapper.find('#username')).toHaveLength(1);
    });

    it('renders a password textfield', () => {
      expect(wrapper.find('#password')).toHaveLength(1);
    });

    it('renders a login button', () => {
      expect(wrapper.find('#submit')).toHaveLength(1);
    });

    it("renders the login button with text 'Sign in'", () => {
      const result = wrapper.find('#submit').text();
      expect(result).toBe('Sign In');
    });

    it('renders an avatar icon', () => {
      expect(wrapper.find('#avatar')).toHaveLength(1);
    });

    describe('username textfield', () => {
      it('should call onChange with relevant event', () => {
        const event = {
          preventDefault() {},
          target: { name: 'username', value: 'test' },
        };

        const handleChange = jest.spyOn(wrapper.instance(), 'change'); // call/spy on the original method
        wrapper.update(); // update forces re-render

        const textfield = wrapper.find('#username');
        textfield.simulate('change', event);

        expect(handleChange).toBeCalled();
        expect(handleChange).toHaveBeenCalledWith(event);
      });

      it('should change state variable username', () => {
        const event = {
          preventDefault() {},
          target: { name: 'username', value: 'test' },
        };

        const textfield = wrapper.find('#username');
        textfield.simulate('change', event);

        expect(wrapper.instance().state.username).toBe('test');
      });
    });

    describe('password textfield', () => {
      it('should call onChange with relevant event', () => {
        const event = {
          preventDefault() {},
          target: { name: 'password', value: 'test' },
        };

        const handleChange = jest.spyOn(wrapper.instance(), 'change'); // call/spy on the original method
        wrapper.update(); // update forces re-render

        const textfield = wrapper.find('#password');
        textfield.simulate('change', event);

        expect(handleChange).toBeCalled();
        expect(handleChange).toHaveBeenCalledWith(event);
      });

      it('should change state variable password', () => {
        const event = {
          preventDefault() {},
          target: { name: 'password', value: 'test' },
        };

        const textfield = wrapper.find('#password');
        textfield.simulate('change', event);

        expect(wrapper.instance().state.username).toBe('test');
      });
    });
  });
});
