import React from 'react';
import { Box, Paper, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  yellow: {
    color: '#ffa000',
  },
  red: {
    color: '#d32f2f',
  },
  green: {
    color: '#388e3c',
  },
  button: {
    textTransform: 'none',
    // marginRight: 'auto',
  },
});

const DEVICE_LIST_QUERY = gql`
  {
    allDevices {
      nodes {
        uuid
        currentlyActive
      }
    }
  }
`;

const tooltipText = 'coolios';

function DeviceRatingFilterPanel() {
  const classes = useStyles();
  const { loading, error } = useQuery(DEVICE_LIST_QUERY);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error :(</p>;

  // TO USE WITH REAL DATA
  //   let greenDevices = 0;
  //   let yellowDevices = 0;
  //   let redDevices = 0;

  //   for (let i = 0; i < data.allDeviceStats.nodes.length; i += 1) {
  //     if (data.allDeviceStats.nodes[i].status === 'Fine') {
  //       greenDevices += 1;
  //     } else if (data.allDeviceStats.nodes[i].status === 'Warning') {
  //       yellowDevices += 1;
  //     } else if (data.allDeviceStats.nodes[i].status === 'Critical') {
  //       redDevices += 1;
  //     }
  //   }

  const greenDevices = 1;
  const yellowDevices = 2;
  const redDevices = 3;

  return (
    <Paper className={classes.root}>
      <Tooltip title={tooltipText} arrow>
        <Box display="flex" width="100%" height="100%">
          <Box m="auto">
            <div>
              <Button
                className={classes.button}
                size="small"
                startIcon={
                  <Zoom in>
                    <RadioButtonUncheckedIcon className={classes.green} />
                  </Zoom>
                }
              >
                Safe Devices: {greenDevices}
              </Button>
            </div>
            <div>
              <Button
                className={classes.button}
                size="small"
                startIcon={
                  <Zoom in style={{ transitionDelay: '150ms' }}>
                    <RadioButtonUncheckedIcon className={classes.yellow} />
                  </Zoom>
                }
              >
                Concerning Devices: {yellowDevices}
              </Button>
            </div>
            <div>
              <Button
                className={classes.button}
                size="small"
                startIcon={
                  <Zoom in style={{ transitionDelay: '300ms' }}>
                    <RadioButtonUncheckedIcon className={classes.red} />
                  </Zoom>
                }
              >
                Critical Devices: {redDevices}
              </Button>
            </div>
          </Box>
        </Box>
      </Tooltip>
    </Paper>
  );
}

DeviceRatingFilterPanel.propTypes = {};

export default DeviceRatingFilterPanel;
