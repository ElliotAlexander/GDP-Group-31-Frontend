import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import HelloWorld from './components/hello-world';
import LoginPage from './components/login-page';
import { history } from './misc/helpers/history';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    history.listen(() => {});
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/" exact render={() => <HelloWorld />} />
          <Route path="/login" render={() => <LoginPage />} />
        </div>
      </Router>
    );
  }
}

export default App;
