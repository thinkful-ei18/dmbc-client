import React from "react";
import { connect } from "react-redux";

import { addCard } from "../actions/cards";
import requiresLogin from "../requires-login";
import { setToolbeltDisplay } from "../actions/dashboard";

import CardButton from "./buttons/cardButton";

export class CreateCard extends React.Component {
  render() {
    const apiTags = ["Family Friendly", "Crowd Friendly", "No Pets"];
    const placeTags = apiTags.map((tag, index) => {
      return <li key={index}>{tag}</li>;
    });
    const distance = this.props.destination.distance
      ? this.props.destination.distance
      : 100000;
    return (
      <div className="create-card-form">
        <form
          onSubmit={event => {
            event.preventDefault();
            let card = {
              name: this.name.value,
              address: this.address.value,
              description: this.description.value.trim(),
              phone: this.phone.value,
              latitude: this.props.latitude,
              longitude: this.props.longitude,
              image: this.props.image
            };
            this.props.dispatch(addCard(card, distance));
            if (this.props.destination !== "") {
              this.props.dispatch(setToolbeltDisplay("cards"));
            } else {
              this.props.changeDisplay();
            }
          }}
        >
          <h4>Create a Card</h4>
          <div
            className="card-container-expanded no-drag"
            key={this.props.index}
          >
            <div
              className="card-header"
              style={{ backgroundImage: `url(${this.props.image})` }}
            >
              <div className="card-title">
                <span className="place-name">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={this.props.name}
                    ref={input => (this.name = input)}
                  />
                </span>
                <span className="card-blurb">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    defaultValue={this.props.location}
                    ref={input => (this.address = input)}
                  />
                </span>
              </div>
            </div>
            <div className="place-tags">
              <ul>{placeTags}</ul>
            </div>
            <div>
              <div className="card-body">
                <span className="blurb-header">Details</span>
                <span className="card-blurb">
                  <textarea
                    name="description"
                    id="description"
                    placeholder="description"
                    maxLength="100"
                    required
                    ref={input => (this.description = input)}
                  />
                </span>
                <span className="card-blurb">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    defaultValue={
                      this.props.phone !== ""
                        ? this.props.phone
                        : "no phone number"
                    }
                    ref={input => (this.phone = input)}
                  />
                </span>
              </div>
              <div className="card-controls">
                <CardButton
                  buttonText={"Create"}
                  overrideStyle={{ fontSize: "1em" }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.cards.loading,
  error: state.cards.error,
  destination: state.dashboard.currentItinerary
    ? state.dashboard.currentItinerary.destination
    : ""
});

export default requiresLogin()(connect(mapStateToProps)(CreateCard));
