import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

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
  red: {
    height: 20,
    width: 20,
    color: 'red',
  },
  yellow: {
    height: 20,
    width: 20,
    color: 'yellow',
  },
  green: {
    height: 20,
    width: 20,
    color: 'green',
  },
});

class FilterPanel extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <div>
            <IconButton>
              <FiberManualRecordIcon className={classes.green} />
              <Typography>15</Typography>
            </IconButton>
          </div>

          <div>
            <IconButton>
              <FiberManualRecordIcon className={classes.yellow} />
              <Typography>10</Typography>
            </IconButton>
          </div>

          <div>
            <IconButton>
              <FiberManualRecordIcon className={classes.red} />
              <Typography>9</Typography>
            </IconButton>
          </div>
        </CardContent>
      </Card>
    );
  }
}

FilterPanel.propTypes = {
  classes: PropTypes.func.isRequired,
};

export default withStyles(useStyles)(FilterPanel);
