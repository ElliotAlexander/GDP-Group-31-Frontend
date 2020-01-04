import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Box, Tooltip } from '@material-ui/core';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
  text: {
    display: 'table-cell',
    jusitfyContent: 'center',
    verticalAlign: 'middle',
  },
  marginAutoContainer: {
    width: 500,
    height: 80,
    display: 'flex',
    backgroundColor: 'gold',
  },
});

const tooltipText =
  'Each device on the network is given a unique IP ' +
  'address in a range (normally 1-256). This address is supplied by your ' +
  'router, and is used to direct traffic to each specific device.';

function DeviceIPAddress(props) {
  const classes = useStyles();
  const { device } = props;

  return (
    <Paper className={classes.root}>
      <Tooltip title={tooltipText} arrow>
        <Box display="flex" width="100%" height="100%" bgcolor="#bbdefb">
          <Box m="auto">
            <Typography
              component="h1"
              variant="h6"
              color="primary"
              align="center"
              noWrap
            >
              Device IP: {device.internalIpV4}
            </Typography>
          </Box>
        </Box>
      </Tooltip>
    </Paper>
  );
}

DeviceIPAddress.propTypes = {
  device: PropTypes.shape({
    internalIpV4: PropTypes.string,
  }),
};

export default DeviceIPAddress;
