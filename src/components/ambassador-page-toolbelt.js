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
            {/* <button onClick={event =>
              this.setState({
                display: 'your cards'
              })
            }>Your Cards</button> */}
            <ViewButton
              buttonFunction={() => this.setState({
                  display: "your cards"
                })
              }
              buttonText={'Your Cards'}
              overrideStyle={{width:'120px',height:'35px',margin:'15px 10px'}}
            />
            {/* <button onClick={event =>
            this.setState({
              display: 'set destination'
            })
            }>New Card</button> */}
            <ViewButton
              buttonFunction={() => this.setState({
                display:'set destination'
              })}
              buttonText={'New Card'}
            />
            {/* <button onClick={event =>
              this.setState({
                display: 'explore'
              })
            }>Explore</button> */}
          </div>
          <div className='a-toolbelt-cards-container'>
            {display}
          </div>




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
