import React from "react";
import {connect} from "react-redux";

import requiresLogin from "../requires-login";
import NewTripForm from "./newTrip-form";
//actions
import {fetchTripDetails, fetchTripDetailsById} from '../actions/tripForm';
//components
import MultiView from './multiView.js';

export class Dashboard extends React.Component {
  componentDidMount() {
    if (this.props.location.state) {
      return this
        .props
        .dispatch(fetchTripDetailsById(this.props.location.state.itineraryId))
    } else if (!this.props.currentItinerary) {
      this
        .props
        .dispatch(fetchTripDetails());
    }
  }

  render() {
    // if (this.props.currentUser.ambassador) {
    //   return <Redirect to="/ambassador-page"/>;
    // }
    return (
      <div className="dashboard">
        Hello from the Dashboard! {this.props.currentItinerary
          ? <MultiView/>
          : <NewTripForm/>}
      </div>
    );
  }
}

const mapStateToProps = state => ({currentItinerary: state.dashboard.currentItinerary, currentUser: state.auth.currentUser});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
