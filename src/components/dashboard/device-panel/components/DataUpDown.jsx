import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    textAlign: 'centre',
  },
  text: {},
});

function DataUpDown(props) {
  const classes = useStyles();
  const { device } = props;

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        className={classes.text}
      >
        Device IP: {device.internalIpV4}
      </Typography>
    </div>
  );
}

DataUpDown.propTypes = {
  device: PropTypes.shape({
    internalIpV4: PropTypes.string,
  }),
};

export default DataUpDown;
