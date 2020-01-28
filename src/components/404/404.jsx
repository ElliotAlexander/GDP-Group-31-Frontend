import React from 'react';
import { Helmet } from 'react-helmet';

import {
  makeStyles,
  Paper,
  Box,
  Tooltip,
  Typography,
  Button,
  Container,
} from '@material-ui/core';

import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    height: '100%',
    marginTop: '20%',
    marginLeft: '20%',
    marginRight: '20%',
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    display: 'table-cell',
    jusitfyContent: 'center',
    verticalAlign: 'middle',
  },
  marginAutoContainer: {
    width: 500,
    height: 500,
    display: 'block',
  },
  textBox: {
    padding: '25px',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

function ErrorPage() {
  const classes = useStyles();

  return (
    <div>
      <Helmet>
        <style>{'body { background-color: #212121; }'}</style>
        <title>Uh Oh</title>
      </Helmet>
      <Paper className={classes.root}>
        <Container>
          <Tooltip title="Hello World" arrow>
            <Box display="flex" width="100%" height="100%">
              <Box m="auto" className={classes.textBox}>
                <Typography
                  component="h1"
                  variant="h1"
                  color="white"
                  align="center"
                  noWrap
                  paragraph
                  fontWeight="fontWeightBold"
                >
                  Uh Oh
                </Typography>

                <Typography
                  component="h5"
                  variant="h6"
                  color="white"
                  align="center"
                >
                  Looks like something went wrong! We&apos;re working on getting
                  this fixed, but in the meantime click below to head back to
                  the main page.
                </Typography>
                <Button component={Link} to="/">
                  Back Home
                </Button>
              </Box>
            </Box>
          </Tooltip>
        </Container>
      </Paper>
    </div>
  );
}

export default ErrorPage;
