import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import HomeIcon from '@material-ui/icons/Home';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';
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

import { connect } from 'react-redux';
import ListElement from './ListElement';

import { setDevice } from '../../../misc/redux-actions/device-actions';
import { logout } from '../../../misc/redux-actions/authentication';

export const drawerWidth = 240;

const DEVICE_LIST_QUERY = gql`
  {
    allDevices {
      nodes {
        macAddr
        deviceNickname
        deviceHostname
        internalIpV4
        uuid
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
    backgroundColor: 'white',
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
  const { children, dispatch } = props;
  const { loading, error, data } = useQuery(DEVICE_LIST_QUERY);
  const [open, setOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPopup = Boolean(anchorEl);

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

  if (loading) return <CircularProgress />;
  if (error) return <p>Error - Sidebar failed to load. Error:</p>;

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
            <div>
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
                <MenuItem onClick={logoutUser}>Logout</MenuItem>
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
            {data.allDevices.nodes.map(device => (
              <div className={classes.listElement} key={device.uuid}>
                <ListElement
                  drawerWidth={drawerWidth}
                  devices={device}
                  action={() => {
                    dispatch(setDevice(device));
                  }}
                />
              </div>
            ))}
          </List>
        </Drawer>
      </div>
      {children}
    </div>
  );
}

Sidebar.propTypes = {
  children: PropTypes.shape({}),
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Sidebar);
