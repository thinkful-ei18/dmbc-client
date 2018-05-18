import React from "react";
import { connect } from "react-redux";
import requiresLogin from "../requires-login";

import { fetchYelp } from "../actions/yelp";

import CreateCard from "./create-card";
import ViewButton from "./buttons/viewButton";
import CardButton from "./buttons/cardButton";
import "../styles/oneDayView.css";

export class Yelp extends React.Component {
  constructor() {
    super();

    this.state = {
      create: false,
      name: "",
      location: "",
      latitude: "",
      longitude: "",
      phone: "",
      image: ""
    };
  }
  render() {
    const apiTags = ["Family Friendly", "Crowd Friendly", "No Pets"];

    const placeTags = apiTags.map((tag, index) => {
      return <li key={index}>{tag}</li>;
    });

    let loading;
    if (this.props.loading) {
      loading = <p>Loading...</p>;
    }

    let searchResults;
    if (this.props.yelp.length > 0) {
      searchResults = this.props.yelp.map((result, index) => {
        let location;
        result.location.display_address.map(address => {
          if (!location) {
            location = address;
          } else {
            location = location + ", " + address;
          }
          return location;
        });
        return (
          <div className="card-container-expanded no-drag" key={index}>
            <div
              className="card-header"
              style={{ backgroundImage: `url(${result.image_url})` }}
            >
              <div className="card-title">
                <span className="place-name">{result.name}</span>
                <span className="card-blurb">{result.display_phone}</span>
              </div>
            </div>
            <div className="place-tags">
              <ul>{placeTags}</ul>
            </div>
            <div>
              <div className="card-body">
                <span className="blurb-header">Location</span>
                <span className="card-blurb">{location}</span>
              </div>
              <div className="card-controls">
                {/* <button onClick={event => {
                    event.preventDefault();
                    this.setState({
                      create: true,
                      name: result.name,
                      location: location,
                      latitude: result.coordinates.latitude,
                      longitude: result.coordinates.longitude,
                      phone: result.display_phone,
                      image: result.image_url
                    })
                  }}>Choose this location</button> */}
                <CardButton
                  buttonText={"Choose this location"}
                  overrideStyle={{
                    width: "200px",
                    margin: "auto",
                    height: "37px",
                    fontSize: "1em"
                  }}
                  buttonFunction={event => {
                    event.preventDefault();
                    this.setState({
                      create: true,
                      name: result.name,
                      location: location,
                      latitude: result.coordinates.latitude,
                      longitude: result.coordinates.longitude,
                      phone: result.display_phone,
                      image: result.image_url
                    });
                  }}
                />
              </div>
            </div>
          </div>
        );
      });
    }
    let nextButton;
    if (searchResults) {
      nextButton = (
        <div>
          {/* <button disabled={this.offset ? '' : 'disabled'}
        onClick={event => {
          event.preventDefault();
          this.offset = this.offset - 1
          this.props.dispatch(fetchYelp(this.location.value, this.term.value, this.offset * 20))
        }}>Back</button> */}
          <ViewButton
            disabled={this.offset === 0}
            buttonText={"Back"}
            buttonFunction={event => {
              event.preventDefault();
              this.offset = this.offset - 1;
              this.props.dispatch(
                fetchYelp(
                  latitude,
                  longitude,
                  this.term.value,
                  this.offset * 20
                )
              );
            }}
          />
          {/* <button onClick={event => {
          event.preventDefault();
          this.offset = this.offset + 1
          this.props.dispatch(fetchYelp(this.location.value, this.term.value, this.offset * 20))
        }}>Next</button> */}
          <ViewButton
            buttonText={"Next"}
            buttonFunction={event => {
              event.preventDefault();
              this.offset = this.offset + 1;
              this.props.dispatch(
                fetchYelp(
                  latitude,
                  longitude,
                  this.term.value,
                  this.offset * 20
                )
              );
            }}
          />
        </div>
      );
    }
    if (this.state.create) {
      return (
        <CreateCard
          name={this.state.name}
          location={this.state.location}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          phone={this.state.phone}
          image={this.state.image}
          changeDisplay={event => this.props.changeDisplay()}
        />
      );
    }
    let latitude;
    let longitude;
    if (this.props.destination && this.props.destination.location.lat) {
      latitude = this.props.destination.location.lat;
      longitude = this.props.destination.location.lng;
    } else if (this.props.destination) {
      latitude = this.props.destination.location.coordinates[1];
      longitude = this.props.destination.location.coordinates[0];
    }
    return (
      <div className="yelp-search">
        <form
          onSubmit={event => {
            event.preventDefault();
            this.offset = 0;
            this.props.dispatch(
              fetchYelp(latitude, longitude, this.term.value, this.offset)
            );
          }}
        >
          <label htmlFor="searchterm">
            Search Yelp to start making your new suggestion card
          </label>
          <input
            type="text"
            ref={input => (this.term = input)}
            placeholder="Lunch, Drinks, Hiking, Family Fun"
            name="searchterm"
          />
          {/* <button><i className="fas fa-search"></i></button> */}
          <ViewButton
            buttonText={<i className="fas fa-search" />}
            overrideStyle={{
              width: "50px",
              margin: 0,
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
              boxShadow: "none"
            }}
          />
        </form>
        {loading}
        <div className="yelp-results">{searchResults}</div>
        {nextButton}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  yelp: state.yelp.yelp,
  loading: state.yelp.loading,
  error: state.yelp.error,
  destination: state.dashboard.currentItinerary
    ? state.dashboard.currentItinerary.destination
    : state.trip.destination
});

export default requiresLogin()(connect(mapStateToProps)(Yelp));
