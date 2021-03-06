import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { dayNamesArray } from "./utils/dateObjectUtils";
import {
  setDashboardCurrentDay,
  setDashboardTripdays
} from "../actions/dashboard";
import { fetchTripDetailsById } from "../actions/tripForm";
import { rateCard } from "../actions/cards";
import MiniBlock from "./mini-block";
import ViewButton from "./buttons/viewButton";

import "../styles/multiView.css";

class MultiView extends Component {
  componentDidMount() {
    if (this.props.match) {
      this.props
        .dispatch(fetchTripDetailsById(this.props.match.params.id))
        .then(() => {
          this.dateStart = this.props.currentItinerary.dateStart;
          this.dateEnd = this.props.currentItinerary.dateEnd;
          this.assembleTripDays();
        });
    } else {
      this.dateStart = this.props.currentItinerary.dateStart;
      this.dateEnd = this.props.currentItinerary.dateEnd;
      this.assembleTripDays();
    }
  }

  assembleTripDays() {
    let start = new Date(this.dateStart);
    let end = this.dateEnd;
    let tripEnd = new Date(end.getTime());
    tripEnd = new Date(tripEnd.setHours(tripEnd.getHours() + 24));
    let tripDays = [];
    while (start.getDate() !== tripEnd.getDate()) {
      let date = new Date(start);
      tripDays.push(date);
      start = new Date(start.setHours(start.getHours() + 24));
    }
    this.props.dispatch(setDashboardTripdays(tripDays));
  }

  handleRedirect(date) {
    this.props.dispatch(setDashboardCurrentDay(date));
  }

  isAllNull(block) {
    return block.findIndex(item => item !== null) === -1;
  }

  assembleTripSpread() {
    if (this.props.tripDays === undefined) {
      return <li className="loading-trip-spread">loading</li>;
    }
    const tripSpread = this.props.tripDays.map((day, index) => {
      const parsedDate = `${
        dayNamesArray[day.getDay()]
      } ${day.toDateString().slice(4, -5)}`;
      const blocks = this.props.currentItinerary.blocks;
      let filteredBlocks = blocks.filter(
        block => day.toDateString() === block.date.toDateString()
      );
      let block = filteredBlocks.map((block, index) => {
        let timelineSymbol;
        if (index !== filteredBlocks.length - 1) {
          timelineSymbol = (
            <div className="timeline-symbol">
              <i className="far fa-circle" />
              <hr />
            </div>
          );
        } else {
          timelineSymbol = (
            <div className="timeline-symbol">
              <i className="far fa-circle" />
            </div>
          );
        }
        return (
          <div className="mini-block-container" key={index}>
            {/* {timelineSymbol} */}
            <MiniBlock
              block={block}
              index={index}
              length={filteredBlocks.length}
              timelineSymbol={timelineSymbol}
              rateCard={input => this.props.dispatch(rateCard(input))}
              ambassador={this.props.currentUser.ambassador}
            />
          </div>
        );
      });
      if (this.isAllNull(block)) {
        block = (
          <p className="no-blocks">
            View day to request suggestions for an activity.
          </p>
        );
      }
      return (
        <li className="multi-view-day" key={index}>
          <Link
            to={`/itineraries/${this.props.currentItinerary.id ||
              this.props.match.params.id}/oneDayView`}
            onClick={() => this.handleRedirect(day)}
            className="one-day-link"
            key={index}
          >
            <div className="multi-day-header">
              <h2 className="block-date">{parsedDate}</h2>
              <ViewButton
                buttonText={"View Day"}
                overrideStyle={{
                  marginRight: "25px",
                  marginTop: "15px",
                  marginBottom: "0",
                  float: "right"
                }}
              />
            </div>
          </Link>
          {block}
        </li>
      );
    });
    return tripSpread;
  }

  render() {
    let trips = this.assembleTripSpread();
    let tripDetails = (
      <div className="trip-details">
        <h1 className="itinerary-header">We are loading your trip</h1>
      </div>
    );

    if (this.props.currentItinerary) {
      tripDetails = (
        <div className="trip-details">
          <h1 className="itinerary-header">
            {this.props.currentItinerary.destination.locationName}
          </h1>
          <h2 className="itinerary-dates">
            {this.props.currentItinerary.dateStart.toDateString()} to{" "}
            {this.props.currentItinerary.dateEnd.toDateString()}
          </h2>
          <h4 className="ambassador-info">
            Select a day below to request expertly curated suggestions from{" "}
            {this.props.currentItinerary.ambassador.name}, your Ambassador for{" "}
            {this.props.currentItinerary.destination.locationName}
          </h4>
        </div>
      );
    }
    return (
      <div className="multi-view">
        {tripDetails}
        <ul>{trips}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tripDays: state.dashboard.tripDays,
  currentItinerary: state.dashboard.currentItinerary,
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(MultiView);
