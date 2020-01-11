import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Route, BrowserRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dashboard from './components/home/Dashboard';
import DeviceDashboard from './components/device/DeviceDashboard';
import theme from './theming/theme.jsx';
import LoginPage from './components/login/LoginPage';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql',
  });

  authLink = setContext((_, { headers }) => {
    let token = this.state.user;
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoibWVkaXVtX3VzZXIiLCJleHAiOjE1NzkzNzIwMDgsInBlcnNvbl9pZCI6MSwiaXNfYWRtaW4iOm51bGwsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTU3ODc2NzIwNywiYXVkIjoicG9zdGdyYXBoaWxlIiwiaXNzIjoicG9zdGdyYXBoaWxlIn0.f3TAHgbKYmlveSYDUuVf2fHadIKnTwgduPXSbs7k9YU";
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  client = new ApolloClient({
    link: this.authLink.concat(this.httpLink),
    cache: new InMemoryCache(),
  });

  render() {
    return (
      <ApolloProvider client={this.client}>
        <ApolloHooksProvider client={this.client}>
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

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(App);
