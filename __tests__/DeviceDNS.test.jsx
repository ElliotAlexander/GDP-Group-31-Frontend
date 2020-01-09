import React from 'react';
import MaterialTable from 'material-table';
import { MockedProvider } from '@apollo/react-testing';
import { shallow } from 'enzyme';
import { gql } from 'apollo-boost';
import DeviceDNSTable from 'components/device/panels/DeviceDNSTable';

const DNS_REQUESTS_QUERY = gql`
  query DNS($uuid: String!) {
    allDeviceDnsStorages(condition: { uuid: $uuid }) {
      nodes {
        url
      }
    }
  }
`;

const data = {
  allDeviceDnsStorages: [
    {
      url: 'www.google.com',
    },
    {
      url: 'helloworld.com',
    },
  ],
};

const device = {
  uuid: '\\x81490845902184092839184903281',
};

describe('DeviceDNS Table testing', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <MockedProvider
        mocks={[
          {
            request: {
              query: DNS_REQUESTS_QUERY,
            },
            results: {
              data,
            },
          },
        ]}
        addTypename={false}
      >
        <DeviceDNSTable device={device} />
      </MockedProvider>,
    );
  });

  it('renders', () => {
    expect(wrapper).toBeDefined();
  });

  it('Loads Material Table correctly', () => {
    expect(wrapper.find(MaterialTable)).toBeDefined();
  });
});
