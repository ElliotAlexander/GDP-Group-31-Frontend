import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from 'components/misc/sidebar/Sidebar';
import configureStore from 'redux-mock-store';

const middlewares = [];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);

describe('Sidebar Testing', () => {
  it('renders without crashing', () => {
    shallow(<Sidebar store={store} />).dive();
  });
});

describe('button testing', () => {
  const wrapper = shallow(<Sidebar store={store} />).dive();

  it('renders a button', () => {
    setTimeout(() => {
      expect(wrapper.find('#closeBtn')).toHaveLength(1);
    });
  });
});

describe('Sidebar function calls', () => {
  it('button click', () => {
    let wrapper = shallow(<Sidebar store={store} />).dive();
    setTimeout(() => {
      wrapper = wrapper.find('#closeBtn').simulate('click');
      setTimeout(() => {
        expect(wrapper.find('.appBarShift')).toHaveLength(1);
      });
    });
  });
});

describe('typography', () => {
  const wrapper = shallow(<Sidebar store={store} />).dive();
  it('typography', () => {
    setTimeout(() => {
      wrapper
        .find('#dashboardName')
        .text()
        .toBe('Dashboard');
    });
  });
});

describe('button labelling', () => {
  it("'check aria label'", () => {
    const wrapper = shallow(<Sidebar store={store} />).dive();
    setTimeout(() => {
      expect(
        wrapper
          .find('[aria-label="open drawer"]')
          .text()
          .equals('open drawer'),
        // test
      ).toBe(true);
    });
  });
});
