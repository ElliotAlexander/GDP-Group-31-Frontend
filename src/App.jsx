import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import HelloWorld from './components/hello-world';
import LoginPage from './components/login-page';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact render={() => <HelloWorld />} />
          <Route path="/login" render={() => <LoginPage />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default hot(App);
