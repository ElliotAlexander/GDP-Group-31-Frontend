import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Paper, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles({
  container: {},
});

const DEVICES_DATA_QUERY = gql`
  query AllDataUpDown {
    allDeviceStats {
      nodes {
        dataIn
        dataOut
      }
    }
  }
`;

const dataDownTooltipText = 'Data downloaded by all devices.';

const dataUpTooltipText = 'Data uploaded by all devices.';

function convertBytesToHumanReadable(byteCount) {
  if (byteCount < 1000) {
    return `${byteCount} Bytes`;
  }

  const KbCount = byteCount / 1000;
  if (KbCount > 1000) {
    const MbCount = Math.round((KbCount / 1000) * 100) / 100;
    return `${MbCount} Mb`;
  }
  const KbCountRounded = Math.round(KbCount * 100) / 100;
  return `${KbCountRounded} Kb`;
}

function sumInDataFromAllDevices(data) {
  let dataIn = 0;
  for (let i = 0; i < data.allDeviceStats.nodes.length; i += 1) {
    dataIn += parseFloat(data.allDeviceStats.nodes[i].dataIn);
  }

  return dataIn;
}

function sumOutDataFromAllDevices(data) {
  let dataOut = 0;
  for (let i = 0; i < data.allDeviceStats.nodes.length; i += 1) {
    dataOut += parseFloat(data.allDeviceStats.nodes[i].dataOut);
  }

  return dataOut;
}

function DataUpDownPanel() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(DEVICES_DATA_QUERY, {
    pollInterval: 5000,
  });

  if (loading)
    return <CircularProgress id="loading" className={classes.load} />;
  if (error)
    return (
      <p id="error" className={classes.load}>
        Error :(
      </p>
    );

  const dataUpFormatted = convertBytesToHumanReadable(
    sumOutDataFromAllDevices(data),
  );
  const dataDownFormatted = convertBytesToHumanReadable(
    sumInDataFromAllDevices(data),
  );

  return (
    <Paper className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <Tooltip title={dataUpTooltipText} arrow>
          <ListItem>
            <ListItemIcon>
              <ArrowUpwardIcon />
            </ListItemIcon>
            <ListItemText primary={dataUpFormatted} />
          </ListItem>
        </Tooltip>
        <Tooltip title={dataDownTooltipText} arrow>
          <ListItem>
            <ListItemIcon>
              <ArrowDownwardIcon />
            </ListItemIcon>
            <ListItemText primary={dataDownFormatted} />
          </ListItem>
        </Tooltip>
      </List>
    </Paper>
  );
}

export default DataUpDownPanel;
