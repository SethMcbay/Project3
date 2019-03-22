import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LogInPage from './components/LogInPage.js'


class App extends Component {
  render() {
    return (
      <div>
        <div>what up</div>
      <Router>
        <Switch>
          <Route exact path="/" component={LogInPage} />
          <Route path="/login" component={LogInPage} />
          {/* <Route path="/user/:userId" component={} /> */}
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
