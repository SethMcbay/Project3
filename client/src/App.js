import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LogInPage from './components/LogInPage.js'
import NavBarComponent from './components/NavBarComponent.js'
// import Wines from './components/Wines.js';
import Wine from './components/Wine.js'
import User from './components/User.js'
import userWines from './components/userWines.js';
import UserList from './components/UserList.js';


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
          <Route path='/wine/:id' component={Wine}/>
          <Route exact path="/user" component={UserList}/>
          <Route exact path="/user/:userId" component={User}/>
          <Route path="/user/:userId/userWine/:id" component={userWines}/>
          {/* <Route path="/user/:userId" component={} /> */}
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
