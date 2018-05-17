import React, { Component } from "react";
import { connect } from "react-redux";
import Geosuggest from "react-geosuggest";

import { setTripDestination } from "../actions/tripForm";
import { fixtures } from "./utils/geoFixtures";

import Card from "./daySpread/Card";
import EditCard from "./edit-card";
import Yelp from "./yelp";
import ViewButton from "./buttons/viewButton";

import "../styles/ambassadorPageToolbelt.css";

class AmbassadorPageToolbelt extends Component {
  constructor() {
    super();
    this.state = {
      display: "your cards",
      cardID: ""
    };
  }

  render() {
    let display;
    if (this.state.display === "your cards") {
      display = this.props.cards.map((card, index) => {
        if (card.ambassador === this.props.currentUser.id) {
          return (
            <Card
              key={index}
              card={card}
              currentUser={this.props.currentUser.id}
              changeDisplay={input =>
                this.setState({
                  display: input.display,
                  cardID: input.cardID
                })
              }
            />
          );
        } else {
          return null;
        }
      });
    } else if (this.state.display === "edit") {
      display = (
        <div>
          <EditCard
            id={this.state.cardID}
            changeDisplay={input => {
              this.setState({
                display: "your cards"
              });
            }}
          />
          <button
            onClick={event =>
              this.setState({
                display: "your cards"
              })
            }
          >
            Back
          </button>
        </div>
      );
    } else if (this.state.display === "set destination") {
      display = (
        <div className="a-toolbelt-newcard-container">
          <h1>Create a new card</h1>
          <span className="a-trip-geo-input-label">
            Where is the place located?
          </span>
          <Geosuggest
            className="a-trip-geo-input"
            fixtures={fixtures}
            onSuggestSelect={location =>
              this.props.dispatch(setTripDestination(location))
            }
          />
          <ViewButton
            buttonFunction={event => {
              this.setState({
                display: "create"
              });
            }}
            buttonText={"create"}
          />
        </div>
      );
    } else if (this.state.display === "create") {
      display = (
        <div className="a-toolbelt-newcard-container">
          <Yelp
            changeDisplay={event => {
              this.setState({ display: "your cards" });
            }}
          />
        </div>
      );
    } else if (this.state.display === "explore") {
      display = this.props.cards.map((card, index) => (
        <Card
          index={index}
          card={card}
          currentUser={this.props.currentUser.id}
        />
      ));
    }

    return (
      <div className="ambassador-page-toolbelt">
        <div className="ambassador-page-toolbelt-header">
          <h1>Toolbelt</h1>
        </div>
        <div className="a-toolbelt-body">
          <div className="a-toolbelt-nav">
            <ViewButton
              buttonFunction={() =>
                this.setState({
                  display: "your cards"
                })
              }
              buttonText={"Your Cards"}
              overrideStyle={{
                width: "120px",
                height: "35px",
                margin: "15px 10px",
                backgroundColor: `${
                  this.state.display === "your cards" ? `rgb(94, 76, 253)` : ""
                }`
              }}
            />
            <ViewButton
              buttonFunction={() =>
                this.setState({
                  display: "set destination"
                })
              }
              buttonText={"New Card"}
              overrideStyle={{
                backgroundColor: `${
                  this.state.display === "set destination"
                    ? `rgb(94, 76, 253)`
                    : ""
                }`
              }}
            />
          </div>
          <div className="a-toolbelt-cards-container">{display}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  destination: state.trip.destination
});

export default connect(mapStateToProps)(AmbassadorPageToolbelt);
