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
import IconButton from '@material-ui/core/IconButton';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const columns = [
  { id: 'name', label: 'Device\u00a0Name', minWidth: 170 },
  { id: 'ip', label: 'IP', minWidth: 170 },
  {
    id: 'rating',
    label: 'Rating',
    minWidth: 170,
    align: 'left',
    format: value => value.toLocaleString(),
  },
  {
    id: 'wire',
    label: 'Wired/Wiredless',
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
    maxHeight: 170,
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
  }
`;

export default function DevicesInfoTable() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(DEVICE_LIST_QUERY);

  const setRating = rating => {
    if (rating > 0 && rating < 3) {
      return (
        <FiberManualRecordIcon className={classes.green} fontSize="small" />
      );
    }

    if (rating > 3 && rating < 6) {
      return (
        <FiberManualRecordIcon className={classes.yellow} fontSize="small" />
      );
    }

    return <FiberManualRecordIcon className={classes.red} fontSize="small" />;
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
                  <StyledTableCell>{device.deviceNickname}</StyledTableCell>
                  <StyledTableCell>{device.internalIpV4}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton size="small">
                      {/* {setRating(device.rating)} */}
                      {setRating(6)}
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell>??</StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  );
}
