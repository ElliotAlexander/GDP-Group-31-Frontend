import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import CircularProgress from '@material-ui/core/CircularProgress';
import MaterialTable, { MTableToolbar } from 'material-table';

const useStyles = makeStyles({
  load: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

const DEVICE_LIST_QUERY = gql`
  query DNS($uuid: String!) {
    allDeviceDnsStorages(condition: { uuid: $uuid }) {
      nodes {
        url
      }
    }
  }
`;

function DeviceDNSTable(props) {
  const classes = useStyles();
  const { device } = props;
  const { uuid } = device;
  const { loading, error, data } = useQuery(DEVICE_LIST_QUERY, {
    variables: { uuid },
    skip: !uuid,
  });

  if (loading)
    return <CircularProgress id="loading" className={classes.load} />;
  if (error)
    return (
      <p id="error" className={classes.load}>
        Error :(
      </p>
    );

  const urls = data.allDeviceDnsStorages.nodes.reduce((acc, node) => {
    return acc.concat({
      dns: node.url,
    });
  }, []);

  return (
    <div style={{ maxWidth: '100%', maxHeight: '100%' }}>
      <MaterialTable
        columns={[{ title: 'URL', field: 'dns' }]}
        data={urls}
        title="DNS Queries"
        options={{
          toolbar: true,
          paging: false,
          maxBodyHeight: 350,
          maxHeaderHeight: 50,
          search: true,
          header: false,
        }}
        menuPosition="fixed"
        menuPlacement="auto"
        components={{
          /* eslint-disable react/jsx-props-no-spreading */
          Toolbar: toolbarProps => <MTableToolbar {...toolbarProps} />,
        }}
      />
    </div>
  );
}

DeviceDNSTable.propTypes = {
  device: PropTypes.shape({
    uuid: PropTypes.string,
  }),
};

export default DeviceDNSTable;
