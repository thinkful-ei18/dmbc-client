import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import { refreshAuthToken } from "../actions/auth";

import Navigation from './navigation';
import Login from "./login";
import Register from "./register";
import AmbassadorRegister from './ambassador-register';
import AmbassadorPage from "./ambassador-page";
import Dashboard from './dashboard';
import EditCard from './edit-card';
import oneDayView from './oneDayView'
import MultiView from "./multiView";
import Splash from './splash'
import "../styles/app.css";

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
      60 * 60 * 1000 // Sixty minutes
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
        {/* <Navigation /> */}
        <Route exact path="/" component={Splash} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/ambassador-register" component={AmbassadorRegister} />
        
        <Route path="/dashboard" component={Navigation} />
        <Route path="/dashboard" component={Dashboard} />

        <Route exact path="/cards/:id" component={Navigation} />
        <Route exact path="/cards/:id" component={EditCard} />

        <Route path="/ambassador-page" component={Navigation} />
        <Route path="/ambassador-page" component={AmbassadorPage} />

        <Route path="/itineraries/:id/oneDayView" component={Navigation} />
        <Route path="/itineraries/:id/oneDayView" component={oneDayView} />

        <Route exact path="/itineraries/:id" component={Navigation} />
        <Route exact path="/itineraries/:id" component={MultiView} />

      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
