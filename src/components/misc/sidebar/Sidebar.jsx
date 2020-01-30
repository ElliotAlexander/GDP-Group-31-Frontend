import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import HomeIcon from '@material-ui/icons/Home';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import CreateIcon from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import PersonIcon from '@material-ui/icons/Person';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BlockIcon from '@material-ui/icons/Block';
import ListElement from './ListElement';

import {
  setDevice,
  clearDevice,
} from '../../../misc/redux-actions/device-actions';
import { logout } from '../../../misc/redux-actions/authentication';

export const drawerWidth = 240;

const DEVICE_LIST_QUERY = gql`
  {
    allDevices {
      nodes {
        macAddr
        deviceNickname
        deviceHostname
        deviceType
        internalIpV4
        uuid
        lastSeen
        setIgnored
      }
    }
    allDeviceSecurityRatings {
      nodes {
        overall
        uuid
      }
    }
  }
`;

const DEVICE_NICKNAME_UPDATE_MUTATION = gql`
  mutation DeviceNicknameUpdateMutation($uuid: String!, $nickname: String!) {
    updateDeviceByUuid(
      input: { devicePatch: { deviceNickname: $nickname }, uuid: $uuid }
    ) {
      device {
        deviceNickname
      }
    }
  }
`;

const DEVICE_REMOVE_MUTATION = gql`
  mutation DeviceRemove($uuid: String!) {
    deleteDeviceFunction(input: { uuidToDelete: $uuid }) {
      clientMutationId
    }
  }
`;

const DEVICE_IGNORE_MUTATION = gql`
  mutation DEVICE_IGNORE_MUTATION($uuid: String!) {
    updateDeviceByUuid(
      input: { uuid: $uuid, devicePatch: { setIgnored: true } }
    ) {
      device {
        currentlyActive
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  deviceList: {
    padding: '0px',
    backgroundColor: theme.custom.backdrop,
  },
  listElement: {
    marginBottom: '2px',
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
}));

function mapStateToProps(state) {
  return {
    device: state.device,
  };
}

function Sidebar(props) {
  const classes = useStyles();
  const { children, dispatch, device } = props;
  const { loading, error, data } = useQuery(DEVICE_LIST_QUERY, {
    pollInterval: 5000,
  });
  const [open, setOpen] = React.useState(false);
  const [editTextOpen, setEditTextOpen] = React.useState(false);
  const [deviceNicknameField, setDeviceNicknameField] = React.useState();
  const [showIgnoredDevices, setShowIgnoredDevices] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const client = useApolloClient();
  const openPopup = Boolean(anchorEl);

  const handleDialogOpen = () => {
    setEditTextOpen(true);
  };

  const handleDialogClose = () => {
    setEditTextOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const toggleIgnoredOn = () => {
    setShowIgnoredDevices(!showIgnoredDevices);
  };

  const updateDeviceNickname = () => {
    client
      .mutate({
        mutation: DEVICE_NICKNAME_UPDATE_MUTATION,
        variables: {
          uuid: device.device.uuid,
          nickname: deviceNicknameField,
        },
      })
      .then(result => {
        device.device.deviceNickname =
          result.data.updateDeviceByUuid.device.deviceNickname;
        handleDialogClose();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const removeDevice = () => {
    client
      .mutate({
        mutation: DEVICE_REMOVE_MUTATION,
        variables: {
          uuid: device.device.uuid,
        },
      })
      .then(() => {
        handleDialogClose();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const ignoreDevice = () => {
    client
      .mutate({
        mutation: DEVICE_IGNORE_MUTATION,
        variables: {
          uuid: device.device.uuid,
        },
      })
      .then(() => {
        handleDialogClose();
        dispatch(clearDevice());
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (loading) return <CircularProgress />;
  if (error) {
    return <Redirect to="/error" />;
  }

  return (
    <div>
      <CssBaseline />
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title}>
              <Link to="/">
                <IconButton aria-label="menu">
                  <HomeIcon />
                </IconButton>
              </Link>
            </Typography>
            {device.device ? (
              <Typography className={classes.title}>
                {device.device.deviceNickname !== 'not set'
                  ? device.device.deviceNickname
                  : device.device.deviceHostname}
              </Typography>
            ) : (
              <div />
            )}
            <div>
              {device.device ? (
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleDialogOpen}
                  color="inherit"
                >
                  <CreateIcon />
                </IconButton>
              ) : (
                <div />
              )}
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openPopup}
                onClose={handleClose}
              >
                <MenuItem onClick={logoutUser}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <Typography variant="inherit">Logout</Typography>
                </MenuItem>
                <MenuItem onClick={toggleIgnoredOn}>
                  <ListItemIcon>
                    <BlockIcon />
                  </ListItemIcon>
                  <Typography variant="inherit">
                    {showIgnoredDevices ? 'Show' : 'Hide'} ignored devices
                  </Typography>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          classes={{
            paper: classes.drawerPaper,
          }}
          open={open}
        >
          <div className={classes.drawerHeader}>
            <Typography
              component="h1"
              variant="h6"
              color="primary"
              align="center"
              noWrap
              className={classes.title}
            >
              Device List
            </Typography>
            <IconButton onClick={handleDrawerClose} id="closeBtn">
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List className={classes.deviceList}>
            {data.allDevices.nodes
              .filter(x => !(showIgnoredDevices && x.setIgnored))
              .map(deviceMap => (
                <div className={classes.listElement} key={deviceMap.uuid}>
                  <ListElement
                    drawerWidth={drawerWidth}
                    devices={deviceMap}
                    rating={data.allDeviceSecurityRatings.nodes.filter(x => x.uuid === deviceMap.uuid)}
                    action={() => {
                      dispatch(setDevice(deviceMap));
                    }}
                  />
                </div>
              ))}
          </List>
        </Drawer>
      </div>
      <Dialog
        open={editTextOpen}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Device</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a nickname for the currently chosen device below, and click
            &apos;Set Nickname&apos; to set the nickname for this device. This
            nickname will persist until changed.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Device Nickname"
            type="name"
            fullWidth
            onChange={e => setDeviceNicknameField(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={removeDevice}
            startIcon={<DeleteIcon />}
          >
            Remove Device
          </Button>
          <Button
            color="secondary"
            onClick={ignoreDevice}
            startIcon={<NotInterestedIcon />}
          >
            Ignore Device
          </Button>
          <div style={{ flex: '1 0 0' }} />
          <Button onClick={handleDialogClose} color="white">
            Cancel
          </Button>
          <Button onClick={updateDeviceNickname} color="white">
            Set Nickname
          </Button>
        </DialogActions>
      </Dialog>
      {children}
    </div>
  );
}

Sidebar.propTypes = {
  children: PropTypes.shape({}),
  dispatch: PropTypes.func.isRequired,
  device: PropTypes.shape({
    device: PropTypes.object,
  }).isRequired,
};

export default withRouter(connect(mapStateToProps)(Sidebar));
