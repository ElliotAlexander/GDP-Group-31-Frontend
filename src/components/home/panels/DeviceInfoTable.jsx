import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'name', label: 'Device\u00a0Name', minWidth: 170 },
  { id: 'ip', label: 'IP', minWidth: 170 },
  {
    id: 'rating',
    label: 'Security Rating',
    minWidth: 170,
    align: 'left',
    format: value => value.toLocaleString(),
  },
  {
    id: 'wire',
    label: 'Device Vendor',
    minWidth: 170,
    align: 'left',
    format: value => value.toLocaleString(),
  },
];

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  container: {
    maxHeight: 250,
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    // '&:hover::-webkit-scrollbar': {
    //   width: '0.4em',
    // },
    '&:hover::-webkit-scrollbar-thumb': {
      backgroundColor: 'darkgray',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
    },
  },
  green: {
    color: 'green',
  },
  yellow: {
    color: 'yellow',
  },
  red: {
    color: 'red',
  },
  load: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

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
    allDeviceSecurityRatings {
      nodes {
        overall
        uuid
      }
    }
  }
`;

export default function DevicesInfoTable() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(DEVICE_LIST_QUERY, {
    pollInterval: 5000,
  });

  const setRating = uuid => {
    const rating = data.allDeviceSecurityRatings.nodes
      .filter(x => x.uuid === uuid)
      .map(y => y.overall);
    if (rating.length === 0) {
      return 'Awaiting data...';
    }

    if (rating > 0 && rating < 0.5) {
      return <p style={{ color: 'green', fontWeight: 'bold' }}>Safe</p>;
    }

    if (rating > 0.3 && rating < 0.75) {
      return <p style={{ color: 'yellow', fontWeight: 'bold' }}>Concerning</p>;
    }
    return <p style={{ color: 'red', fontWeight: 'bold' }}>Critical</p>;
  };

  if (loading)
    return <CircularProgress id="loading" className={classes.load} />;
  if (error)
    return (
      <p id="error" className={classes.load}>
        Error :( - Device Info table failed to load.
      </p>
    );

  return (
    <Paper>
      <div id="table">
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.allDevices.nodes.map(device => (
                <TableRow key={device.uuid}>
                  <StyledTableCell>
                    {device.deviceNickname === 'not set'
                      ? device.deviceHostname
                      : device.deviceNickname}
                  </StyledTableCell>
                  <StyledTableCell>{device.internalIpV4}</StyledTableCell>
                  <StyledTableCell>{setRating(device.uuid)}</StyledTableCell>
                  <StyledTableCell>{device.deviceType}</StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  );
}
