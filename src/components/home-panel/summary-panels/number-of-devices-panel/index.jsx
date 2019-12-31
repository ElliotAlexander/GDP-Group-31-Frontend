import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const useStyles = () => ({
  card: {
    display: 'flex',
    minHeight: 100,
    maxHeight: 100,
  },
  data: {
    position: 'absolute',
    left: '100%',
    top: '50%',
    transform: 'translate(-170%, -60%)',
    fontSize: 60,
    fontFamily: 'Ma Shan Zheng',
    src: `
      url(https://fonts.googleapis.com/css?family=Ma+Shan+Zheng&display=swap)
    `,
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
});

class NumberOfDevicesPanel extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.titlebar}>
            <SnackbarContent
              className={classes.title}
              message="ALL CONNECTED DEVICES"
            />
          </div>

          <div>
            <Typography className={classes.data}>15</Typography>
          </div>
        </CardContent>
      </Card>
    );
  }
}

NumberOfDevicesPanel.propTypes = {
  classes: PropTypes.func.isRequired,
};

export default withStyles(useStyles)(NumberOfDevicesPanel);
