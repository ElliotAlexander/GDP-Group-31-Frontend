import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import HelloWorld from './components/hello-world';
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
        <BrowserRouter>
          <div>
            <Route path="/" exact render={() => <HelloWorld />} />
            <Route path="/login" render={() => <LoginPage />} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default hot(App);
