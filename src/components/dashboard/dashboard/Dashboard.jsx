import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { indigo } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import HomePanel from '../../home-panel/index';

import DrawerBar from './DrawerBar.jsx';

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

// eslint-disable-next-line react/prop-types
export default function Dashboard({ onToggleDark }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <DrawerBar onToggleDark={onToggleDark} />
      <main className={classes.content}>
        <HomePanel />
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
};
