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
      
    }, 
    allDeviceSecurityRatings {
      edges {
        node {
          overall
          uuid
        }
      }
    }
  }
`;

const tooltipText = 'Device state based on security rating.';

function DeviceRatingFilterPanel() {
  const classes = useStyles();
  const { data, loading, error } = useQuery(DEVICE_LIST_QUERY);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error :(</p>;

  const greenDevices =  data.allDeviceSecurityRatings.edges.filter(x => x.node.overall <= 0.5).length;
  const yellowDevices = data.allDeviceSecurityRatings.edges.filter(x => (x.node.overall > 0.5) && (x.node.overall < 0.75)).length;
  const redDevices = data.allDeviceSecurityRatings.edges.filter(x => x.node.overall >= 0.75).length;

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
