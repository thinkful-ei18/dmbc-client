import React, { Component, PropTypes } from "react";
import { Field, reduxForm, focus } from "redux-form";
import DatePicker from "react-date-picker";
import Geosuggest from "react-geosuggest";

/**
 * FormDraft

 */

const formStyle = {
  margin: "auto",
  display: "flex",
  wrap: "wrap",
  border: "1px solid red",
  width: "85vw",
  height: "500px",
  alignItems: "center"
};

/*
var timeDiff = Math.abs(date2.getTime() - date1.getTime());
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
*/
export default class FormDraft extends Component {
  // eslint-disable-line react/prefer-stateless-function
  //start and end inclusive dates
  state = {
    startDate: new Date(),
    endDate: new Date(),
    location: ""
  };
  //development only
  checkDays() {
    console.log(this.state);
  }

  render() {
    //defualt values on first focus for Geosuggest
    const fixtures = [
      { label: "Chicago", location: { lat: 40.7033127, lng: -73.979681 } },
      { label: "Mexico City", location: { lat: -22.066452, lng: -42.9232368 } },
      { label: "Tokyo", location: { lat: 35.673343, lng: 139.710388 } },
      { label: "San Diego", location: { lat: 35.673343, lng: 139.710388 } },
      { label: "France", location: { lat: 35.673343, lng: 139.710388 } },
      { label: "Gemany", location: { lat: 35.673343, lng: 139.710388 } }
    ];
    return (
      <div style={formStyle}>
        <p>I'm traveling to</p>
        {/* <Geosuggest
          fixtures={fixtures}
          onSuggestSelect={(location) => this.setState({location})}
        /> */}
        {/* temporary, working remotely no wifi. */}
        <input type="text" />
        From
        <DatePicker
          value={this.state.startDate}
          onChange={startDate => this.setState({ startDate })}
        />
        <p>up until,</p>
        <DatePicker
          value={this.state.endDate}
          onChange={endDate => this.setState({ endDate })}
        />
        <button onClick={() => console.log("event fired")}>Submit</button>
      </div>
    );
  }
}
