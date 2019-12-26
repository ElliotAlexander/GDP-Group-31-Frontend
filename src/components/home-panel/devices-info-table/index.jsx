import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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

function createData(name, ip, rating, wire) {
  return { name, ip, rating, wire };
}

const rows = [
  createData('Amazon Alexa', '180.164.22.38', 2, 'yes/no?'),
  createData('Amazon Alexa', '180.164.22.38', 6, 'yes/no?'),
  createData('Amazon Alexa', '180.164.22.38', 1, 'yes/no?'),
  createData('Amazon Alexa', '180.164.22.38', 2, 'yes/no?'),
  createData('Amazon Alexa', '180.164.22.38', 3, 'yes/no?'),
  createData('Amazon Alexa', '180.164.22.38', 5, 'yes/no?'),
  createData('Amazon Alexa', '180.164.22.38', 4, 'yes/no?'),
  createData('Amazon Alexa', '180.164.22.38', 4, 'yes/no?'),
  createData('Amazon Alexa', '180.164.22.38', 3, 'yes/no?'),
  createData('Amazon Alexa', '180.164.22.38', 2, 'yes/no?'),
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
});

export default function DevicesInfoTable() {
  const classes = useStyles();

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

  return (
    <Paper>
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
            {rows.map(row => (
              <TableRow key={row.name}>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.ip}</StyledTableCell>
                <StyledTableCell>
                  <IconButton size="small">{setRating(row.rating)}</IconButton>
                </StyledTableCell>
                <StyledTableCell>{row.wire}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
