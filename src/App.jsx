import React, { Component } from 'react';
import { split } from 'apollo-link';
import { ThemeProvider } from '@material-ui/core/styles';
import { Route, BrowserRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { connect } from 'react-redux';
import { WebSocketLink } from 'apollo-link-ws';

import PropTypes from 'prop-types';
import { getMainDefinition } from 'apollo-utilities';
import Dashboard from './components/home/Dashboard';
import DeviceDashboard from './components/device/DeviceDashboard';
import theme from './theming/theme.jsx';
import LoginPage from './components/login/LoginPage';
import ErrorPage from './components/404/404';

function mapStateToProps(state) {
  return {
    authentication: state.authentication,
  };
}

class App extends Component {
  httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql',
  });

  wsLink = new WebSocketLink({
    uri: `ws://localhost:5000/graphql`,
    options: {
      reconnect: true,
    },
  });

  defaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  };

  authLink = setContext((_, { headers }) => {
    const { authentication } = this.props;
    if (authentication.user) {
      const token = authentication.user;
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    }
    return {
      headers: {
        ...headers,
      },
    };
  });

  link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    this.wsLink,
    this.authLink.concat(this.httpLink),
  );

  client = new ApolloClient({
    link: this.link,
    cache: new InMemoryCache(),
    defaultOptions: this.defaultOptions,
  });

  render() {
    const { authentication } = this.props;
    return (
      <ApolloProvider client={this.client}>
        <ApolloHooksProvider client={this.client}>
          <BrowserRouter>
            {authentication.loggedIn ? (
              <ThemeProvider theme={theme}>
                <Route path="/" exact render={() => <Dashboard />} />
                <Route path="/device" render={() => <DeviceDashboard />} />
                <Route path="/error" render={() => <ErrorPage />} />
              </ThemeProvider>
            ) : (
              <LoginPage />
            )}
          </BrowserRouter>
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}

App.propTypes = {
  authentication: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(App);
