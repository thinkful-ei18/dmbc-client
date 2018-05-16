import React from "react";
import {connect} from "react-redux";

import requiresLogin from "../requires-login";
import AmbassadorItineraries from "./ambassador-itineraries";
import AmbassadorPastItineraries from "./ambassador-past-itineraries";
// import AmbassadorExplore from "./ambassador-explore";
import {fetchItineraries} from "../actions/ambassador-itineraries";
import {fetchCards} from "../actions/cards";
import Logo from './logo';

export class AmbassadorPage extends React.Component {
  componentWillMount() {
    if (!this.props.itineraries.itineraries.length > 0) {
      this
        .props
        .dispatch(fetchItineraries())
    }
    if (!this.props.cards.cards.length > 0 || this.props.cards.filtered) {
      this
        .props
        .dispatch(fetchCards());
    }
  }

  render() {
    return (
      <div>
        <Logo />
      <div className="ambassador-page">
        <AmbassadorItineraries/>
        <AmbassadorPastItineraries/>
        {/* <AmbassadorExplore/> */}
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  itineraries: state.itineraries,
  cards: state.cards
});

export default requiresLogin()(connect(mapStateToProps)(AmbassadorPage));
