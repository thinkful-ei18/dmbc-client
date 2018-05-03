import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import requiresLogin from "../requires-login";
import Logout from "./logout";
import NewTripForm from "./newTrip-form";

export class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        Hello from the Dashboard!
        {this.props.currentItenerary.length ? (
          "this is where the multi view would go"
        ) : (
          <NewTripForm />
        )}
        <Logout />
        <Link to="/ambassador-page">
          <button>Ambassador Page</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentItenerary: [],
  currentUser: state.auth.currentUser
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
