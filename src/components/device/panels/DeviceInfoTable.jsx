import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
// import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableHeadCell = withStyles(() => ({
  body: {
    backgroundColor: '#000000',
    fontSize: 14,
    width: '40%',
  },
}))(TableCell);

const useStyles = makeStyles({
  container: {
    maxHeight: 290,
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
  query DeviceDetails($uuid: String!) {
    deviceByUuid(uuid: $uuid) {
      deviceNickname
      deviceType
      firstSeen
      internalIpV4
      lastSeen
      macAddr
      currentlyActive
    }
  }
`;

function DevicesInfoTable(props) {
  const classes = useStyles();
  const { device } = props;
  const { uuid } = device;
  const { loading, error, data } = useQuery(DEVICE_LIST_QUERY, {
    variables: { uuid },
    skip: !uuid,
    pollInterval: 5000,
  });

  if (loading)
    return <CircularProgress id="loading" className={classes.load} />;
  if (error)
    return (
      <p id="error" className={classes.load}>
        Error :( - Device Info table failed to load.
      </p>
    );

  const firstSeenInMilliSeconds = Date.parse(data.deviceByUuid.firstSeen);
  const firstSeen = new Date(firstSeenInMilliSeconds);

  const lastSeenInMilliSeconds = Date.parse(data.deviceByUuid.lastSeen);
  const lastSeen = new Date(lastSeenInMilliSeconds);

  return (
    <Paper>
      <div id="table">
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              <TableRow>
                <StyledTableHeadCell>Device Name</StyledTableHeadCell>
                <StyledTableCell>
                  {data.deviceByUuid.deviceNickname}
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHeadCell>IP Address</StyledTableHeadCell>
                <StyledTableCell>
                  {data.deviceByUuid.internalIpV4}
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHeadCell>MAC Address</StyledTableHeadCell>
                <StyledTableCell>{data.deviceByUuid.macAddr}</StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHeadCell>Rating</StyledTableHeadCell>
                <StyledTableCell>Rating</StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHeadCell>Device Type</StyledTableHeadCell>
                <StyledTableCell>
                  {data.deviceByUuid.deviceType}
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHeadCell>First Seen</StyledTableHeadCell>
                <StyledTableCell>{firstSeen.toLocaleString()}</StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHeadCell>Last Seen</StyledTableHeadCell>
                <StyledTableCell>{lastSeen.toLocaleString()}</StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  );
}

DevicesInfoTable.propTypes = {
  device: PropTypes.shape({
    uuid: PropTypes.string,
  }),
};

export default DevicesInfoTable;
