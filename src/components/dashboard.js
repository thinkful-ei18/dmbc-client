import React from "react";
import {connect} from "react-redux";

import requiresLogin from "../requires-login";
import NewTripForm from "./newTrip-form";
//actions
import {fetchTripDetails} from '../actions/tripForm';
//components
import MultiView from './multiView.js';

export class Dashboard extends React.Component {
  componentDidMount() {
    if (!this.props.currentItinerary || this.props.currentItinerary.id !== this.props.currentUser.itineraries) {
      this
        .props
        .dispatch(fetchTripDetails());
    }
  }

  render() {
    let dashboard = (<p>Loading...</p>)

    if (this.props.currentItinerary) {
        dashboard = <MultiView/>
    } else if (this.props.noTrip) {
      dashboard = <NewTripForm/>
    }
    return (
      <div className="dashboard">
        {dashboard}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  noTrip: state.dashboard.error === 'No trip',
  currentItinerary: state.dashboard.currentItinerary, 
  currentUser: state.auth.currentUser
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
