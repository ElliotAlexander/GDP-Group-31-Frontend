import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
  dotGreen: {
    float: 'left',
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    padding: '0px',
    backgroundColor: 'green',
    paddingLeft: '5px',
  },
  dotRed: {
    float: 'left',
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    padding: '0px',
    backgroundColor: 'red',
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
const inactiveTooltipText = 'Device is not currently active.';
const deviceMacAdddressText =
  'Device Mac address. All network devices are identified by a manufacturer assigned MAC address, unique to every device. We use this to track each device.';
const deviceVendorText =
  'This is the device vendor. We can track Vendors by the MAC addresses assigned to the devices they sell. Mac Addresses are unique to each device, and supplied by the manufacturer. Mac addresses are used to track devices.';

export default function ListElement(props) {
  const { drawerWidth, action, rating, ...device } = props;
  const ratingObj = rating.length > 0 ? rating[0] : [];
  const classes = useStyles();

  const generatePadding = () => {
    if (ratingObj.overall < 0.5) {
      return '10px solid green';
    }

    if (ratingObj.overall < 0.9 && ratingObj.overall >= 0.5) {
      return '10px solid yellow';
    }

    return '10px solid red';
  };

  const checkDeviceStatus = () => {
    if (
      new Date().getTime() - new Date(device.devices.lastSeen).getTime() <
      60000
    ) {
      return (
        <Tooltip title={activeTooltipText}>
          <span className={classes.dotGreen} />
        </Tooltip>
      );
    }
    return (
      <Tooltip
        title={
          inactiveTooltipText +
          `Last seen at ${new Date(device.devices.lastSeen).toUTCString()}`
        }
      >
        <span className={classes.dotRed} />
      </Tooltip>
    );
  };

  return (
    <Link style={{ textDecoration: 'none', color: 'white' }} to="/device">
      <ListItem
        button
        key={device.devices.deviceHostname}
        className={classes.listElement}
        style={{ borderLeft: generatePadding() }}
        onClick={action}
      >
        <div className={classes.elementRoot}>
          <div className={classes.inlineIconContainer}>
            <LaptopMacSharpIcon className={classes.listIcon} />
            <Tooltip title={device.devices.deviceHostname}>
              <h4
                className={classes.listElementText}
                style={{ width: '150px' }}
              >
                {device.devices.deviceNickname === 'not set'
                  ? device.devices.deviceHostname
                  : device.devices.deviceNickname}
              </h4>
            </Tooltip>
          </div>
          <ul className={classes.navElem}>
            <li className={classes.listElem}>
              <Tooltip
                title={
                  device.devices.deviceType
                    ? deviceVendorText
                    : deviceMacAdddressText
                }
              >
                <h5>
                  {device.devices.deviceType
                    ? device.devices.deviceType
                    : device.devices.macAddr}
                </h5>
              </Tooltip>
            </li>
            <li className={classes.listElem}>{checkDeviceStatus(device)}</li>
          </ul>
        </div>
      </ListItem>
    </Link>
  );
}

ListElement.propTypes = {
  drawerWidth: PropTypes.number,
  device: PropTypes.shape({}),
  action: PropTypes.func,
  rating: PropTypes.shape({
    length: PropTypes.number,
  }),
};
