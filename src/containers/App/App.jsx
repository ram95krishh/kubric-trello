import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { selectors as userSelectors } from '../../state/ducks/auth';
import {
  operations as startupOperations,
  selectors as startupSelectors,
} from '../../state/ducks/startup';
import RootNavigation from '../RootNavigation';
import Auth from '../Auth';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.stet = {};
  }

  componentDidMount() {
    const { initStartUpTasks } = this.props;
    initStartUpTasks();
  }

  render() {
    const { isAuthenticated, loading } = this.props;
    if (loading) {
      return (
        <div> loading </div>
      );
    }
    if (!isAuthenticated) {
      return (
        <Router>
          <Route
            exact
            path="/"
          >
            <Auth />
          </Route>
        </Router>
      );
    }
    return <RootNavigation />;
  }
}

App.propTypes = {
  initStartUpTasks: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: !startupSelectors.isStartUpCompleted(state),
  isAuthenticated: userSelectors.isAuthenticated(state),
});

const mapDispatchToProps = dispatch => ({
  initStartUpTasks: startupOperations.initStartUpTasks(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
