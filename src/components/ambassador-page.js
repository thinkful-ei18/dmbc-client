import React from "react";
import { connect } from "react-redux";

import requiresLogin from "../requires-login";
import Logout from "./logout";
import AmbassadorItineraries from "./ambassador-itineraries";
import AmbassadorPastItineraries from "./ambassador-past-itineraries";
import AmbassadorExplore from "./ambassador-explore";

export class AmbassadorPage extends React.Component {
  render() {
    return (
      <div className="ambassador-page">
        <AmbassadorItineraries />
        <AmbassadorPastItineraries />
        <AmbassadorExplore />Í
        <button>My Cards</button>
        <Logout />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentItenerary: [],
  currentUser: state.auth.currentUser
});

export default requiresLogin()(connect(mapStateToProps)(AmbassadorPage));
