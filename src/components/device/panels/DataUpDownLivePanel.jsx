import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Paper, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles({});

const DEVICE_DATA_QUERY = gql`
  query UpDownDataInitial($uuid: String!) {
    allDeviceStatsOverTimes(
      condition: { uuid: $uuid }
      first: 2
      orderBy: TIMESTAMP_DESC
    ) {
      edges {
        node {
          dataOut
          dataIn
          dataTransferred
        }
      }
    }
  }
`;

const dataUploadedLast10Seconds = "The rate of data upload from a device over the last 10 seconds - note that this may have a slight delay over real conditions.";
const dataDownloadedLast10Seconds = "The rate of data download from a device over the last 10 seconds - note that this may have a slight delay over real conditions.";

function convertBytesToHumanReadable(byteCount) {
  if (byteCount < 1000) {
    return `${byteCount} Bytes`;
  }

  const KbCount = byteCount / 1000;
  if (KbCount > 1000) {
    const MbCount = KbCount / 1000;
    return `${MbCount} Mb`;
  }
  return `${KbCount} Kb`;
}

function DataUpDownLivePanel(props) {
  const classes = useStyles();
  const { device } = props;
  const { uuid } = device;
  const { data, loading, error } = useQuery(DEVICE_DATA_QUERY, {
    variables: { uuid },
    skip: !uuid,
    pollInterval: 5000,
  });

  if (loading)
    return <CircularProgress id="loading" className={classes.load} />;
  if (error) {
    return (
      <p id="error" className={classes.load}>
        Error :(
      </p>
    );
  }

  return (
    <Paper className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <Tooltip title={dataUploadedLast10Seconds} arrow>
          <ListItem button>
            <ListItemIcon>
              <ArrowUpwardIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                data.allDeviceStatsOverTimes.edges.length >= 2
                  ? convertBytesToHumanReadable(
                      (data.allDeviceStatsOverTimes.edges[0].node.dataOut -
                        data.allDeviceStatsOverTimes.edges[1].node.dataOut) /
                        10,
                    ) + '/s'
                  : 'N/A'
              }
            />
          </ListItem>
        </Tooltip>
        <Tooltip title={dataDownloadedLast10Seconds} arrow>
          <ListItem>
            <ListItemIcon>
              <ArrowDownwardIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                data.allDeviceStatsOverTimes.edges.length >= 2
                  ? convertBytesToHumanReadable(
                      (data.allDeviceStatsOverTimes.edges[0].node.dataIn -
                        data.allDeviceStatsOverTimes.edges[1].node.dataIn) /
                        10,
                    ) + '/s'
                  : 'N/A'
              }
            />
          </ListItem>
        </Tooltip>
      </List>
    </Paper>
  );
}

DataUpDownLivePanel.propTypes = {
  device: PropTypes.shape({
    uuid: PropTypes.string,
  }),
};

export default DataUpDownLivePanel;
