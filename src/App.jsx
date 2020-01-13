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
    authentication: state.authentication,
  };
}

class App extends Component {
  httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql',
  });

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

  client = new ApolloClient({
    link: this.authLink.concat(this.httpLink),
    cache: new InMemoryCache(),
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
