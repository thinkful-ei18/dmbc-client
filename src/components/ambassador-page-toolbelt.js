import React, { Component } from "react";
import { connect } from "react-redux";
import Geosuggest from "react-geosuggest";

import Card from "./daySpread/Card";
import EditCard from "./edit-card";
import Yelp from "./yelp";

import { setTripDestination } from "../actions/tripForm";

import "../styles/ambassadorPageToolbelt.css";

const fixtures = [
  {
    gmaps: {
      address_components: [
        {
          long_name: "Chicago",
          types: ["locality"]
        }
      ]
    },
    label: "Chicago",
    location: { lat: 41.8781, lng: -87.6298 }
  },
  {
    gmaps: {
      address_components: [
        {
          long_name: "Mexico City",
          types: ["locality"]
        }
      ]
    },
    label: "Mexico City",
    location: { lat: 19.4326, lng: -99.1332 }
  },
  {
    gmaps: {
      address_components: [
        {
          long_name: "Tokyo",
          types: ["locality"]
        }
      ]
    },
    label: "Tokyo",
    location: { lat: 35.673343, lng: 139.710388 }
  }
];

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
            />
          );
        } else {
          return null;
        }
      });
    } else if (this.state.display === "edit") {
      display = (
        <div>
          <EditCard id={this.state.cardID} />
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
        <div>
          <Geosuggest
            className="trip-geo-input"
            fixtures={fixtures}
            onSuggestSelect={location =>
              this.props.dispatch(setTripDestination(location))
            }
          />
          <button
            onClick={event => {
              this.setState({
                display: "create"
              });
            }}
          >
            Search
          </button>
        </div>
      );
    } else if (this.state.display === "create") {
      display = (
        <div>
          <Yelp />
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

    console.log(this.props);
    return (
      <div className="ambassador-page-toolbelt">
        <div className="ambassador-page-toolbelt-header">
          <h1>Toolbelt</h1>
        </div>
        <div className="a-toolbelt-body">
          <div className="a-toolbelt-nav">
            <button
              onClick={event =>
                this.setState({
                  display: "your cards"
                })
              }
            >
              Your Cards
            </button>
            <button
              onClick={event =>
                this.setState({
                  display: "set destination"
                })
              }
            >
              New Card
            </button>
            <button
              onClick={event =>
                this.setState({
                  display: "explore"
                })
              }
            >
              Explore
            </button>
          </div>
          {display}
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
