import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import HelloWorld from './components/hello-world';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact render={() => <HelloWorld />} />
      </BrowserRouter>
    );
  }
}

export default App;
