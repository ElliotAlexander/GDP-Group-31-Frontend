import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from '@material-ui/core/styles';
import Navbar from './components/dashboard/navbar/index.jsx';
import theme from './theming/theme.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Navbar />;
      </ThemeProvider>
    );
  }
}

export default hot(App);
