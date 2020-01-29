import React from 'react';

import {
  makeStyles,
  Paper,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinkIcon from '@material-ui/icons/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MaterialTable, { MTableToolbar } from 'material-table';

const useStyles = makeStyles({
  load: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

const DEVICE_DATA_QUERY = gql`
  query ExitNodes($uuid: String!) {
    allTorNodes(condition: { uuid: $uuid }) {
      edges {
        node {
          ipAddress
        }
      }
    }
  }
`;

function TorDevicePanel(props) {
  const classes = useStyles();
  const { device } = props;
  const { uuid } = device;
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { loading, error, data } = useQuery(DEVICE_DATA_QUERY, {
    variables: { uuid },
    skip: !uuid,
  });

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  if (loading)
    return <CircularProgress id="loading" className={classes.load} />;
  if (error)
    return (
      <p id="error" className={classes.load}>
        Error :(
      </p>
    );

  const foundTraffic = data.allTorNodes.edges.length !== 0;
  const urls = data.allTorNodes.edges.map(x => {
    return {
      url: x.node.ipAddress,
    };
  });
  console.log(urls);

  return (
    <Paper className={classes.root} style={{ height: '100%' }}>
      <List component="nav" aria-label="main mailbox folders">
        <Tooltip title="Temp" arrow>
          <ListItem button onClick={handleDialogOpen}>
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                foundTraffic ? (
                  <Typography type="body2" style={{ color: '#ff6384' }}>
                    Darkweb Traffic detected!
                  </Typography>
                ) : (
                  <Typography type="body2" style={{ color: 'red' }}>
                    No Darkweb Traffic found.
                  </Typography>
                )
              }
            />
          </ListItem>
        </Tooltip>
      </List>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Dark Web Traffic</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {foundTraffic ? (
              <Typography>
                Darkweb traffic was detected on your network. The Dark Web is a
                network of servers through which traffic is bounced through,
                making it impossible to track the original origin of the
                traffic. This system is called Tor, and can be a strong
                indicator that there is a malicious actor inside a network. You
                can read more about Tor{' '}
                <a
                  target="_blank"
                  style={{ textDecoration: 'none', color: 'white' }}
                  href="www.google.co.uk"
                >
                  here
                </a>
                . We track Dark Web Traffic by tracking traffic to Exit Nodes.
                Exit nodes are well-trusted servers where data can enter and
                leave the Tor Network. Below is a list of the exit nodes traffic
                is passing through on this network.
              </Typography>
            ) : (
              <Typography>
                No Darkweb traffic was detected on your network. The Dark Web is
                a network of servers through which traffic is bounced through,
                making it impossible to track the original origin of the
                traffic. This system is called Tor, and can be a strong
                indicator that there is a malicious actor inside a network. You
                can read more about Tor{' '}
                <a
                  style={{ textDecoration: 'none', color: 'white' }}
                  href="www.google.co.uk"
                >
                  here
                </a>
                We track Dark Web Traffic by tracking traffic to Exit Nodes.
                Exit nodes are well-trusted servers where data can enter and
                leave the Tor Network.
              </Typography>
            )}
          </DialogContentText>
          {foundTraffic ? (
            <MaterialTable
              columns={[{ title: 'Exit Node IP address', field: 'url' }]}
              data={urls}
              title="Exit Nodes"
              options={{
                toolbar: true,
                paging: false,
                maxBodyHeight: 346,
                minBodyHeight: 346,
                maxHeaderHeight: 50,
                search: true,
                header: false,
                exportButton: true,
              }}
              menuPosition="fixed"
              menuPlacement="auto"
              components={{
                /* eslint-disable react/jsx-props-no-spreading */
                Toolbar: toolbarProps => <MTableToolbar {...toolbarProps} />,
              }}
            />
          ) : (
            <div />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

TorDevicePanel.propTypes = {
  device: PropTypes.shape({
    uuid: PropTypes.string,
  }),
};

export default TorDevicePanel;
