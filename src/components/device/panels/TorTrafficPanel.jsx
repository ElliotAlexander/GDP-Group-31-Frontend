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
import ImportExportIcon from '@material-ui/icons/ImportExport';

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
    allDeviceStats(condition: { uuid: $uuid }) {
      edges {
        node {
          portsTraffic
          packetCount
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
  const [portDialogOpen, setPortDialogOpen] = React.useState(false);
  const { loading, error, data } = useQuery(DEVICE_DATA_QUERY, {
    variables: { uuid },
    skip: !uuid,
    pollingInterval: 5000,
  });

  const badPorts = [
    21,
    22,
    23,
    25,
    110,
    135,
    137,
    138,
    139,
    1080,
    1433,
    3389,
    31,
    1170,
    1234,
    1243,
    1981,
    2001,
    2023,
    2989,
    3024,
    3150,
    3700,
    4950,
    6346,
    6400,
    6667,
    6670,
    12345,
    12346,
    16660,
    20034,
    20432,
    20433,
    27374,
    27444,
    27665,
    30100,
    31335,
    31337,
    33270,
    33568,
    40421,
    60008,
    65000,
  ];

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handlePortDialogClose = () => {
    setPortDialogOpen(false);
  };

  const handlePortDialogOpen = () => {
    setPortDialogOpen(true);
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

  const dataPorts = [];
  const ports = data.allDeviceStats.edges[0].node.portsTraffic
    .split(',')
    .map(x => {
      const [port, count] = x.split(':');
      dataPorts.push({
        port,
        percentage: Math.round(
          (parseInt(count) /
            parseInt(data.allDeviceStats.edges[0].node.packetCount)) *
            100,
        ),
        warning: badPorts.includes(port),
      });
    });
  const foundPorts = ports.length > 0;

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
                  <Typography type="body2" style={{ color: 'white' }}>
                    No Darkweb Traffic detected.
                  </Typography>
                )
              }
            />
          </ListItem>
        </Tooltip>
        <Tooltip title="Temp" arrow>
          <ListItem button onClick={handlePortDialogOpen}>
            <ListItemIcon>
              <ImportExportIcon />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                foundTraffic ? (
                  <Typography type="body2" style={{ color: '#ff6384' }}>
                    Port Traffic Unavailable.
                  </Typography>
                ) : (
                  <Typography type="body2" style={{ color: 'red' }}>
                    Traffic on {ports.length} Ports
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
          {foundPorts ? (
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
                sorting: true,
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
      <Dialog
        open={portDialogOpen}
        onClose={handlePortDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Port Traffic</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Below is a list of all ports where traffic was detected on this
            device. A port is a 16-bit number used to identify specific
            applications and services. Most ports are considered normal, however
            some may be indicators of malicious behaviour. If you're unsure
            about a port on your network, you can check if it relates to a known
            service{' '}
            <a
              target="_blank"
              style={{ textDecoration: 'none', color: 'white' }}
              href="https://www.wikiwand.com/en/List_of_TCP_and_UDP_port_numbers#/Well-known_ports"
            >
              here
            </a>
          </DialogContentText>
          {foundPorts ? (
            <MaterialTable
              columns={[
                { title: 'Port Detected', field: 'port' },
                { title: 'Traffic %: ', field: 'percentage' },
              ]}
              data={dataPorts}
              title="Port Traffic"
              options={{
                toolbar: true,
                paging: false,
                maxBodyHeight: 346,
                minBodyHeight: 346,
                maxHeaderHeight: 50,
                search: true,
                header: true,
                exportButton: true,
              }}
              menuPosition="fixed"
              menuPlacement="auto"
            />
          ) : (
            <div />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePortDialogClose}>Close</Button>
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
