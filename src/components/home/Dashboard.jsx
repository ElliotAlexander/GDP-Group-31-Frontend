import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

// import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import Sidebar from '../misc/sidebar/Sidebar';
import DashboardGrid from './DashboardGrid';

// const useStyles = makeStyles(theme => ({
//   title: {
//     flexGrow: 1,
//   },
//   appBarSpacer: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     height: '100vh',
//     overflow: 'auto',
//     paddingTop: '75px',
//   },
// }));

function Dashboard() {
  // const classes = useStyles();

  return (
    <Sidebar>
      <CssBaseline />
      <main>
        <DashboardGrid />
      </main>
    </Sidebar>
  );
}

export default withRouter(Dashboard);
