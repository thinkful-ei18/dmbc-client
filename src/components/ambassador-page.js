import React from "react";
import { connect } from "react-redux";
import { fetchItineraries } from "../actions/ambassador-itineraries";
import { fetchCards } from "../actions/cards";

import requiresLogin from "../requires-login";
import AmbassadorItineraries from "./ambassador-itineraries";
import AmbassadorPastItineraries from "./ambassador-past-itineraries";
import AmbasadorPageToolbelt from "./ambassador-page-toolbelt";
// import AmbassadorExplore from "./ambassador-explore";

import Logo from "./logo";
import "../styles/ambasadorPage.css";

export class AmbassadorPage extends React.Component {
  componentWillMount() {
    if (!this.props.itineraries.itineraries.length > 0) {
      this.props.dispatch(fetchItineraries());
    }
    if (!this.props.cards.cards.length > 0 || this.props.cards.filtered) {
      this.props.dispatch(fetchCards());
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div className="ambassador-page-header">
          <Logo />
          <h3>Hello, {this.props.currentUser.name}</h3>
        </div>
        <div className="ambassador-page">
          <AmbassadorItineraries />
          <AmbassadorPastItineraries />
          <AmbasadorPageToolbelt cards={this.props.cards.cards} />
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
