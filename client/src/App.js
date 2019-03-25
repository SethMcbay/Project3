import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LogInPage from './components/LogInPage.js'
import NavBarComponent from './components/NavBarComponent.js'
import Wines from './components/Wines.js';
import Wine from './components/Wine'


class App extends Component {
  render() {
    return (
      <div>
        <div>
        <NavBarComponent/>
        </div>
      <Router>
        <Switch>
          <Route exact path="/" component={LogInPage} />
          <Route path="/login" component={LogInPage} />
          <Route path='/wines/:id' component={Wine}/>
          <Route path="/wines" component={Wines}/>
          {/* <Route path="/user/:userId" component={} /> */}
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
