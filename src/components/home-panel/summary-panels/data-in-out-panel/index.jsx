import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = () => ({
  card: {
    display: 'flex',
    background: 'white',
    minHeight: 100,
    alignItems: 'center',
  },
  titlebar: {
    position: 'absolute',
    left: '2%',
    top: '0%',
    transform: 'translate(0%, -30%)',
  },
  title: {
    minWidth: '100px',
    background: '#298abd',
  },
  data: {
    position: 'absolute',
    left: '65%',
    top: '50%',
    transform: 'translate(0%, -54%)',
  },
  avatar: {
    width: '60%',
    height: '80%',
  },
});

class DataInOutPanel extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.titlebar}>
            <SnackbarContent className={classes.title} message="DATA SMTH" />
          </div>

          <div className={classes.data}>
            <List aria-label="mailbox folders">
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.avatar} variant="rounded">
                    <ArrowUpwardIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="700" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.avatar} variant="rounded">
                    <ArrowDownwardIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="200" />
              </ListItem>
            </List>
          </div>
        </CardContent>
      </Card>
    );
  }
}

DataInOutPanel.propTypes = {
  classes: PropTypes.func.isRequired,
};

export default withStyles(useStyles)(DataInOutPanel);
