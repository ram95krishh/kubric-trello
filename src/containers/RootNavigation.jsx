import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import About from '../components/About';
import Board from './Board';
import DrawerHeader from '../components/DrawerHeader';

class RootNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
          >
            <DrawerHeader>
              <Board />
            </DrawerHeader>
          </Route>
          <Route
            path="/about"
          >
            <DrawerHeader>
              <About />
            </DrawerHeader>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default RootNavigation;
