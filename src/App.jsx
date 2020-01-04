import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Route, BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import Dashboard from './components/home/Dashboard';
import DeviceDashboard from './components/device/DeviceDashboard';
import theme from './theming/theme.jsx';
import LoginPage from './components/login/LoginPage';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <Route path="/" exact render={() => <Dashboard />} />
              <Route path="/login" render={() => <LoginPage />} />
              <Route path="/device" render={() => <DeviceDashboard />} />
            </ThemeProvider>
          </BrowserRouter>
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}
export default App;
