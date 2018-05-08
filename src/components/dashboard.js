import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import requiresLogin from "../requires-login";
import Logout from "./logout";
import NewTripForm from "./newTrip-form";
//actions
import { fetchTripDetails } from '../actions/tripForm';
//components
import MultiView from './multiView.js';


export class Dashboard extends React.Component {
  componentDidMount(){
    console.log(this.props.location.state.itineraryId)
    console.log('dash mounted');
    this.props.dispatch(fetchTripDetails());
  }
  render () {
    return (
      <div className="dashboard">
        Hello from the Dashboard!
        {this.props.currentItinerary ? <MultiView /> : <NewTripForm />}
        <Logout />
        <Link to="/ambassador-page">
          <button>Ambassador Page</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentItinerary:state.dashboard.currentItinerary,
  currentUser: state.auth.currentUser
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
