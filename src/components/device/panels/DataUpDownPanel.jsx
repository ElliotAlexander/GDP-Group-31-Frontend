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

const DEVICE_DATA_QUERY = gql`
  query UpDownData($uuid: String!) {
    deviceStatByUuid(uuid: $uuid) {
      dataIn
      dataOut
    }
  }
`;

const useStyles = makeStyles({
  container: {},
});

const dataDownTooltipText = 'Data downloaded by the selected device.';

const dataUpTooltipText = 'Data uploaded by the selected device.';

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

function DataUpDownPanel(props) {
  const classes = useStyles();
  const { device } = props;
  const { uuid } = device;
  const { loading, error, data } = useQuery(DEVICE_DATA_QUERY, {
    variables: { uuid },
    skip: !uuid,
  });

  if (loading)
    return <CircularProgress id="loading" className={classes.load} />;
  if (error)
    return (
      <p id="error" className={classes.load}>
        Error :(
      </p>
    );

  const dataOutFormatted = convertBytesToHumanReadable(
    data.deviceStatByUuid.dataOut,
  );
  const dataInFormatted = convertBytesToHumanReadable(
    data.deviceStatByUuid.dataIn,
  );

  return (
    <Paper className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <Tooltip title={dataUpTooltipText} arrow>
          <ListItem>
            <ListItemIcon>
              <ArrowUpwardIcon />
            </ListItemIcon>
            <ListItemText primary={dataInFormatted} />
          </ListItem>
        </Tooltip>
        <Tooltip title={dataDownTooltipText} arrow>
          <ListItem>
            <ListItemIcon>
              <ArrowDownwardIcon />
            </ListItemIcon>
            <ListItemText primary={dataOutFormatted} />
          </ListItem>
        </Tooltip>
      </List>
    </Paper>
  );
}

DataUpDownPanel.propTypes = {
  device: PropTypes.shape({
    uuid: PropTypes.string,
  }),
};

export default DataUpDownPanel;
