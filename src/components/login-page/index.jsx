import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Eco from '@material-ui/icons/Eco';
import Grow from '@material-ui/core/Grow';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { login } from '../../misc/redux-actions/login';
import img from './background-images/stock-bg-image-3.jpg';

const useStyles = theme => ({
  '@global': {
    body: {
      backgroundImage: `url(${img})`,
      backgroundColor: '#000000',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      margin: '0px',
      padding: '0px',
    },
    html: {
      height: '100%',
    },
  },
  paper: {
    backgroundColor: '#eceff1', // '#eeeeee',
    marginTop: theme.spacing(25),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '10px',
    textAlign: 'center',
    width: '80%',
    boxShadow: '5px 5px 100px 30px black',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#004d40', // '#546e7a',
  },
  form: {
    width: '80%',
    marginTop: theme.spacing(1),
  },
  submit: {
    width: '50%',
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#004d40', // '#546e7a',
    '&:hover': {
      backgroundColor: '#00695c',
      borderColor: '#004d40',
    },
  },
});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.login(username, password);
  }

  render() {
    const { username, password } = this.state;
    const { classes } = this.props;

    return (
      <Grow in>
        <Container maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <Eco />
            </Avatar>
            <form
              onSubmit={e => this.submit(e)}
              className={classes.form}
              noValidate
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="username"
                id="username"
                label="Username"
                value={username}
                onChange={e => this.change(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={e => this.change(e)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
          </div>
        </Container>
      </Grow>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export const LoginPageWithStyles = withStyles(useStyles)(LoginPage);

export default connect(
  null,
  { login },
)(withStyles(useStyles, { withTheme: true })(LoginPage));
