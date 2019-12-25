import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import LaptopMacSharpIcon from '@material-ui/icons/LaptopMacSharp';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  elementRoot: {
    flexDirection: 'column',
  },
  listElement: {
    borderColor: '#000000',
    borderLeft: '10px solid red',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  listElementText: {
    padding: '0px',
    margin: '0px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis', // This is where the magic happens
    width: '100px',
  },
  inlineIconContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  listIcon: {
    marginRight: '10px',
  },
  dot: {
    float: 'left',
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    padding: '0px',
    backgroundColor: 'green',
    paddingLeft: '5px',
  },
  navElem: {
    listStyleType: 'none',
    margin: '0',
    paddingLeft: '0px',
  },
  listElem: {
    display: 'inline-block',
    paddingLeft: '5px',
  },
}));

const activeTooltipText = 'Device is currently active.';
const deviceMacAdddressText =
  'Device Mac address. All network devices are identified by a manufacturer assigned MAC address, unique to every device. We use this to track each device.';

export default function ListElement(props) {
  const { drawerWidth, ...device } = props;
  const classes = useStyles();

  return (
    <div>
      <ListItem
        button
        key={device.devices.deviceHostname}
        className={classes.listElement}
      >
        <div className={classes.elementRoot}>
          <div className={classes.inlineIconContainer}>
            <LaptopMacSharpIcon className={classes.listIcon} />
            <h4 className={classes.listElementText} style={{ width: '150px' }}>
              {device.devices.deviceHostname}
            </h4>
          </div>
          <ul className={classes.navElem}>
            <li className={classes.listElem}>
              <Tooltip title={deviceMacAdddressText}>
                <h5>{device.devices.macAddr}</h5>
              </Tooltip>
            </li>
            <li className={classes.listElem}>
              <Tooltip title={activeTooltipText}>
                <span className={classes.dot}></span>
              </Tooltip>
            </li>
          </ul>
        </div>
      </ListItem>
    </div>
  );
}

ListElement.propTypes = {
  drawerWidth: PropTypes.number,
  device: PropTypes.shape({}),
};
