import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import LoginPage from './components/login-page';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <LoginPage />;
  }
}

export default hot(App);
