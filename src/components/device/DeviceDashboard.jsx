import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { indigo } from '@material-ui/core/colors';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import DevicePanel from './DevicePanel';
import Sidebar from '../misc/sidebar/Sidebar';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    background: indigo,
  },
  fixedHeight: {
    height: 600,
  },
}));

function DeviceDashboard(props) {
  const classes = useStyles();
  const { location } = props;

  return (
    <Sidebar>
      <CssBaseline />
      <main className={classes.content}>
        <DevicePanel location={location} />
      </main>
    </Sidebar>
  );
}

DeviceDashboard.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default withRouter(DeviceDashboard);