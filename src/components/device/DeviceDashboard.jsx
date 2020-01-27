import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import DevicePanel from './DevicePanel';
import Sidebar from '../misc/sidebar/Sidebar';

// const useStyles = makeStyles(theme => ({
//   title: {
//     flexGrow: 1,
//   },
//   appBarSpacer: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     height: '100vh',
//     overflow: 'auto',
//   },
// }));

function DeviceDashboard(props) {
  // const classes = useStyles();
  const { location } = props;

  return (
    <Sidebar>
      <CssBaseline />
      <main>
        <DevicePanel location={location} />
      </main>
    </Sidebar>
  );
}

DeviceDashboard.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default withRouter(DeviceDashboard);
