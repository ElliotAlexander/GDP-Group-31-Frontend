import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard/Dashboard.jsx';
import theme from './theming/theme.jsx';
import LoginPage from './components/login-page';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div>
            <Route path="/" exact render={() => <Dashboard />} />
            <Route path="/login" render={() => <LoginPage />} />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}
export default App;
