import React from "react";
import { connect } from "react-redux";
import Yelp from "./yelp";

import { setToolbeltDisplay } from "../actions/dashboard";
import { fetchDestinationCards, fetchSearchCards } from "../actions/cards";

import requiresLogin from "../requires-login";
import ToolbeltCard from "./toolBeltCard";
import EditCard from "./edit-card";
import ViewButton from "./buttons/viewButton";

import "../styles/oneDayView.css";
import "../styles/toolbelt.css";
import Background from "../assets/barPlaceHolder.jpg";

export class Toolbelt extends React.Component {
  constructor() {
    super();
    this.state = {
      cardId: ""
    };
  }
  componentWillMount() {
    if (this.props.availableBlocks.length > 0) {
      this.selectVal = this.props.availableBlocks[0].id;
    }
    const destination = {
      distance: this.props.destination.distance,
      lat: this.props.destination.location.coordinates[1],
      lng: this.props.destination.location.coordinates[0]
    };
    if (!this.props.filtered) {
      this.props.dispatch(fetchDestinationCards(destination));
    }
  }

  componentDidUpdate() {
    if (this.props.availableBlocks.length > 0) {
      this.selectVal = this.props.availableBlocks[0].id;
    }
  }

  render() {
    const apiTags = ["Family Friendly", "Crowd Friendly", "No Pets"];

    const placeTags = apiTags.map((tag, index) => {
      return <li key={index}>{tag}</li>;
    });

    const cards = this.props.cards.map((card, index) => {
      return (
        <ToolbeltCard
          Background={Background}
          key={index}
          card={card}
          index={index}
          placeTags={placeTags}
          cardId={cardId => {
            this.setState({
              cardId: cardId
            });
          }}
        />
      );
    });

    let display;
    if (this.props.toolBeltDisplay === "cards") {
      display = (
        <div>
          <form
            className="card-search"
            onSubmit={event => {
              event.preventDefault();
              const values = {
                searchTerm: this.searchTerm.value,
                distance: this.props.destination.distance,
                lat: this.props.destination.location.coordinates[1],
                lng: this.props.destination.location.coordinates[0]
              };
              this.props.dispatch(fetchSearchCards(values));
            }}
          >
            <label htmlFor="search">Your cards</label>
            <input
              placeholder="search your cards"
              name="search"
              ref={input => (this.searchTerm = input)}
            />
            <ViewButton
              buttonText={<i className="fas fa-search" />}
              // buttonClass={'toolbelt-button-search'}
              overrideStyle={{
                width: "50px",
                margin: 0,
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
                boxShadow: "none"
              }}
            />
          </form>
          <div className="cards-container">{cards}</div>
        </div>
      );
    } else if (this.props.toolBeltDisplay === "create") {
      display = <Yelp />;
    } else if (this.props.toolBeltDisplay === "edit") {
      display = <EditCard id={this.state.cardId} />;
    }

    let changeState;
    if (this.props.toolBeltDisplay === "cards") {
      changeState = (
        <ViewButton
          buttonText={"New Card"}
          buttonFunction={() =>
            this.props.dispatch(setToolbeltDisplay("create"))
          }
          overrideStyle={{ margin: "24px 20px 24px 0px" }}
        />
      );
    } else if (this.props.toolBeltDisplay !== "cards") {
      changeState = (
        <ViewButton
          buttonText={"Back"}
          buttonFunction={() =>
            this.props.dispatch(setToolbeltDisplay("cards"))
          }
          overrideStyle={{
            backgroundColor: "tomato",
            margin: "24px 20px 24px 0px"
          }}
        />
      );
    }

    return (
      <div
        className={
          this.props.cardsContainer === "hidden"
            ? "toolbelt-hidden"
            : "toolbelt"
        }
      >
        <div className="cards">
          <div className="cards-content">
            {changeState}
            {display}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filtered: state.cards.filtered,
  cards: state.cards.cards,
  loading: state.cards.loading,
  error: state.cards.error,
  destination: state.dashboard.currentItinerary.destination,
  toolBeltDisplay: state.dashboard.toolBeltDisplay
});

export default requiresLogin()(connect(mapStateToProps)(Toolbelt));
