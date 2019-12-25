import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { indigo } from '@material-ui/core/colors';
import DevicePanel from '../device-panel/index.jsx';
import DrawerBar from './DrawerBar/DrawerBar.jsx';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
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

export default function DeviceDashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <DrawerBar />
      <main className={classes.content}>
        <DevicePanel />
      </main>
    </div>
  );
}
