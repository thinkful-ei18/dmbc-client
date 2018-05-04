import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {refreshAuthToken} from '../actions/auth';

import '../styles/app.css'
import Navigation from './navigation';
import Login from './login';
import Register from './register';
import AmbassadorRegister from './ambassador-register';
import Dashboard from './dashboard';
import DaySpreads from './daySpreads';
import Cards from './cards';
import EditCard from './edit-card';

export class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn && !this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (!nextProps.loggedIn && this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      10 * 60 * 1000 // Ten minutes
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }
    clearInterval(this.refreshInterval);
  }

  render() {
    return(
      <div className="app">
        <Navigation />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/ambassador-register" component={AmbassadorRegister} />
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/cards" component={Cards} />
        <Route exact path="/cards/:id" component={EditCard} />
        <Route exact path="/DaySpreads" component={DaySpreads} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
