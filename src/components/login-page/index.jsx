import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Eco from '@material-ui/icons/Eco';
import Grow from '@material-ui/core/Grow';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import img from './stock-bg-image-1.jpg';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundImage: `url(${img})`,
      backgroundColor: '#000000',
      height: '100%',
      width: '100%',
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
    backgroundColor: '#4eb1ba',
    marginTop: theme.spacing(25),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '10px',
    textAlign: 'center',
    width: '80%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '80%',
    marginTop: theme.spacing(1),
  },
  submit: {
    width: '50%',
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginPage() {
  const classes = useStyles();

  return (
    <Grow in>
      <Container className={classes.main} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Eco />
          </Avatar>
          <form className={classes.form} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              // type="submit"
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
