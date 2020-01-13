import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';
import { withRouter } from 'react-router-dom';

import Sidebar from '../misc/sidebar/Sidebar';
import DashboardGrid from './DashboardGrid';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    paddingTop: '75px',
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

function Dashboard() {
  const classes = useStyles();

  return (
    <Sidebar>
      <CssBaseline />
      <main className={classes.content}>
        <DashboardGrid />
      </main>
    </Sidebar>
  );
}

export default withRouter(Dashboard);
