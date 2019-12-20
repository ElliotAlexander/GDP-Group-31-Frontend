import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { resetPassword } from '../../misc/redux-actions/resetPassword';

export const useStyles = theme => ({
  submit: {
    width: '50%',
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#004d40',
    '&:hover': {
      backgroundColor: '#00695c',
      borderColor: '#004d40',
    },
  },
});

class ResetPasswordPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordNew1: '',
      passwordNew2: '',
    };

    this.change = this.change.bind(this);
    this.reset = this.reset.bind(this);
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  reset(e) {
    e.preventDefault();
    const { passwordNew1, passwordNew2 } = this.state;

    const { username } = this.props;

    // rather link this to disable the button if they are not the same - chech material ui
    if (passwordNew1 === passwordNew2) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.resetPassword(username, passwordNew1);
    } else {
      // TODO
      console.log('add alert for no match passwords ' + username);
    }
  }

  render() {
    const { passwordNew1, passwordNew2 } = this.state;

    const { classes } = this.props;

    return (
      <form onSubmit={e => this.reset(e)} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          name="passwordNew1"
          id="passwordNew1"
          label="New Password"
          type="password"
          value={passwordNew1}
          onChange={e => this.change(e)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="passwordNew2"
          id="passwordNew2"
          label="New Password"
          type="password"
          value={passwordNew2}
          onChange={e => this.change(e)}
        />
        <Button
          id="reset"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Reset
        </Button>
      </form>
    );
  }
}

ResetPasswordPanel.propTypes = {
  classes: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default connect(
  null,
  { resetPassword },
)(withStyles(useStyles, { withTheme: true })(ResetPasswordPanel));
