import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import { refreshAuthToken } from "../actions/auth";

import "./app.css";
import Navigation from './navigation';
import Login from "./login/login";
import Register from "./registration/register";
import AmbassadorRegister from './registration/ambassador-register';
import AmbassadorPage from "./ambassador/ambassador-page";
import Dashboard from './dashboard';
import EditCard from './toolbelt/edit-card';
import oneDayView from './daySpread/oneDayView';

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
    return (
      <div className="app">
        <Navigation />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/ambassador-register" component={AmbassadorRegister} />
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/cards/:id" component={EditCard} />
        <Route path="/ambassador-page" component={AmbassadorPage} />
        <Route exact path="/oneDayView" component={oneDayView} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));