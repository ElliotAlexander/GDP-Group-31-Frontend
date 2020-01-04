import React from 'react';
import { gql } from 'apollo-boost';
import { createMount } from '@material-ui/core/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import DevicesInfoTable from 'components/home/panels/DeviceInfoTable';
import { act } from 'react-dom/test-utils';

const DEVICE_LIST_QUERY = gql`
  {
    allDevices {
      nodes {
        macAddr
        deviceNickname
        deviceHostname
        internalIpV4
        internalIpV6
        lastSeen
        deviceType
        uuid
      }
    }
  }
`;

const mocks = [
  {
    request: {
      query: DEVICE_LIST_QUERY,
    },
    result: {
      data: {
        allDevices: {
          nodes: [
            {
              macAddr: '1a',
              deviceNickname: '2a',
              deviceHostname: '3a',
              internalIpV4: '4a',
              internalIpV6: '5a',
              lastSeen: '6a',
              deviceType: '7a',
              uuid: '8a',
            },
            {
              macAddr: '1b',
              deviceNickname: '2b',
              deviceHostname: '3b',
              internalIpV4: '4b',
              internalIpV6: '5b',
              lastSeen: '6b',
              deviceType: '7b',
              uuid: '8b',
            },
          ],
        },
      },
    },
  },
];

const mocksError = [
  {
    request: {
      query: DEVICE_LIST_QUERY,
    },
    error: new Error('aw shucks'),
  },
];

const updateWrapper = async (wrapper, time = 0) => {
  await act(async () => {
    await new Promise(res => setTimeout(res, time));
    await wrapper.update();
  });
};

describe('DevicesInfoTable Component', () => {
  let mount;
  let wrapper;

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it('renders without crashing', () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DevicesInfoTable />
      </MockedProvider>,
    );
  });

  describe('Panel state', () => {
    it('renders the device table', async () => {
      wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <DevicesInfoTable />
        </MockedProvider>,
      );

      await updateWrapper(wrapper);

      expect(wrapper.find('#table')).toHaveLength(1);
    });

    it('renders the loading', async () => {
      wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <DevicesInfoTable />
        </MockedProvider>,
      );

      expect(wrapper.find('#loading')).toHaveLength(3);
    });

    it('renders the error', async () => {
      wrapper = mount(
        <MockedProvider mocks={mocksError} addTypename={false}>
          <DevicesInfoTable />
        </MockedProvider>,
      );

      await updateWrapper(wrapper);

      expect(wrapper.find('#error')).toHaveLength(1);
    });
  });
});
