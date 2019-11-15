import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import LoginPage from './components/login-page';
import { store } from './misc/helpers/store';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <LoginPage />;
      </Provider>
    );
  }
}

export default hot(App);
