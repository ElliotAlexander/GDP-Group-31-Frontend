import React from 'react';
import { shallow, mount } from 'enzyme';
// eslint-disable-next-line import/no-duplicates
import DrawerBar from 'components/dashboard/dashboard/DrawerBar.jsx';
// eslint-disable-next-line import/no-duplicates

describe('DrawerBar Testing', () => {
  it('renders without crashing', () => {
    shallow(<DrawerBar />);
  });
});

describe('button testing', () => {
  const wrapper = mount(<DrawerBar />);
  it('button should render', () => {
    const icnButton1 = wrapper.find('#closeBtn');
    const icnButton2 = wrapper.find('#icnBtn');
    expect(icnButton1.exists()).toEqual(true);
    expect(icnButton2.exists()).toEqual(true);
  });

  it('renders a button', () => {
    setTimeout(() => {
      expect(wrapper.find('#icnBtn')).toHaveLength(1);
    });
  });
});

describe('drawerbar function calls', () => {
  it('button click', () => {
    let wrapper = mount(<DrawerBar />);
    setTimeout(() => {
      wrapper = wrapper.find('#closeBtn').simulate('click');
      setTimeout(() => {
        expect(wrapper.find('.appBarShift')).toHaveLength(1);
      });
    });
  });
});

describe('typography', () => {
  const wrapper = mount(<DrawerBar />);
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
    const wrapper = mount(<DrawerBar />);
    // eslint-disable-next-line jest/valid-expect
    setTimeout(() => {
      expect(
        wrapper
          .find('[aria-label="open drawer"]')
          .text()
          .equals('open drawer'),
        // eslint-disable-next-line jest/valid-expect
      ).to.equal(true);
    });
  });
});
