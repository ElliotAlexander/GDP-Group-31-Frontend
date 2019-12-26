import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = () => ({
  card: {
    display: 'flex',
    background: 'lightgrey',
    minHeight: 100,
  },
  content: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

class NumberOfDevicesPanel extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography>15 Devices</Typography>
        </CardContent>
      </Card>
    );
  }
}

NumberOfDevicesPanel.propTypes = {
  classes: PropTypes.func.isRequired,
};

export default withStyles(useStyles)(NumberOfDevicesPanel);
