import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Zoom from '@material-ui/core/Zoom';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const useStyles = () => ({
  card: {
    display: 'flex',
    background: 'white',
    minHeight: 100,
    maxHeight: 100,
  },
  buttonGroup: {
    position: 'absolute',
    left: '85%',
    top: '46%',
    transform: 'translate(-50%, -50%)',
  },
  redButton: {
    color: '#d32f2f',
  },
  yellow: {
    color: '#ffa000',
  },
  greenButton: {
    color: '#388e3c',
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

const GreenButton = withStyles({
  root: {
    '&:hover': {
      backgroundColor: '#C9E2CB',
    },
    '&:active': {
      backgroundColor: '#C9E2CB',
    },
    '&:focus': {
      backgroundColor: '#C9E2CB',
    },
  },
})(Button);

const YellowButton = withStyles({
  root: {
    '&:hover': {
      backgroundColor: '#FDFAC9',
    },
    '&:active': {
      backgroundColor: '#FDFAC9',
    },
    '&:focus': {
      backgroundColor: '#FDFAC9',
    },
  },
})(Button);

const RedButton = withStyles({
  root: {
    '&:hover': {
      backgroundColor: '#FDDAC9',
    },
    '&:active': {
      backgroundColor: '#FDDAC9',
    },
    '&:focus': {
      backgroundColor: '#FDDAC9',
    },
  },
})(Button);

class FilterPanel extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.titlebar}>
            <SnackbarContent
              className={classes.title}
              message="DEVICE RATING FILTER THINGY"
            />
          </div>
          <div className={classes.buttonGroup}>
            <ButtonGroup
              orientation="vertical"
              variant="text"
              aria-label="text primary button group"
            >
              <GreenButton
                size="small"
                startIcon={
                  <Zoom in>
                    <RadioButtonUncheckedIcon className={classes.greenButton} />
                  </Zoom>
                }
              >
                7
              </GreenButton>
              <YellowButton
                size="small"
                startIcon={
                  <Zoom in style={{ transitionDelay: '150ms' }}>
                    <RadioButtonUncheckedIcon className={classes.yellow} />
                  </Zoom>
                }
              >
                5
              </YellowButton>
              <RedButton
                size="small"
                startIcon={
                  <Zoom in style={{ transitionDelay: '300ms' }}>
                    <RadioButtonUncheckedIcon className={classes.redButton} />
                  </Zoom>
                }
              >
                2
              </RedButton>
            </ButtonGroup>
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
