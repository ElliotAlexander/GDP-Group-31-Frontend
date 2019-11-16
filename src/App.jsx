/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theming/theme.jsx';
import DrawerBar from './components/dashboard/dashboard/DrawerBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <DrawerBar />
      </ThemeProvider>
    );
  }
}

export default hot(App);
