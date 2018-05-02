import React, { Component, PropTypes } from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';

//react components
import DatePicker from 'react-date-picker';
import Geosuggest from 'react-geosuggest';

//actions
import {
  setDateStart,
  setDateEnd,
  setTripDestination,
  setTripPartners,
  pushTripDetails
} from '../actions/trip';
//styles
import '../styles/newTrip-form.css';

class NewTripForm extends Component {
  sendDays(){
    //temp fix need to either modify back end or my actions.
    const tripDetails = {
      // "destination":this.props.destination,
      "dateStart":this.props.dateStart,
      "dateEnd":this.props.dateEnd,
      "partners":this.props.partners,
      "ambassador":'322222222222222222222200'
    }
    return this.props.dispatch(pushTripDetails(tripDetails));
  }

  render() {
    //defualt values on first focus for Geosuggest
    const fixtures = [
      {label: 'Chicago', location: {lat: 40.7033127, lng: -73.979681}},
      {label: 'Mexico City', location: {lat: -22.066452, lng: -42.9232368}},
      {label: 'Tokyo', location: {lat: 35.673343, lng: 139.710388}},
      {label: 'San Diego', location: {lat: 35.673343, lng: 139.710388}},
      {label: 'France', location: {lat: 35.673343, lng: 139.710388}},
      {label: 'Gemany', location: {lat: 35.673343, lng: 139.710388}},
    ];
    return (
      <div className='tripFormContainer'>
        <div className='tripFormPlace'>
          <p>I'm traveling to</p>
          <Geosuggest
            className="tripGeoInput"
            fixtures={fixtures}
            onSuggestSelect={(location) => this.props.dispatch(setTripDestination(location))}
          />
        </div>
        <div className='tripFromDates'>
          <p>From</p>
          <DatePicker
            value={this.props.dateStart}
            onChange={ (dateStart) => this.props.dispatch(setDateStart(dateStart)) }
          />
        <p>up until,</p>
          <DatePicker
            value={this.props.dateEnd}
            onChange={ (dateEnd) => this.props.dispatch(setDateEnd(dateEnd)) }
          />
        </div>
        <div className='tripTravelrs'>
          <p>and I'm traveling with</p>
          <input type="text" onBlur={(travelers) => this.props.dispatch(setTripPartners(travelers.target.value))}/>
        </div>
        <div className='controls'>
          <button onClick={() =>this.sendDays()}>Submit</button>
        </div>

      </div>
    );
  }
}


const mapStateToProps = (state) =>({
  dateStart:state.trip.dateStart,
  dateEnd:state.trip.dateEnd,
  partners:state.trip.partners,
  destination:state.trip.destination
})

export default connect(mapStateToProps)(NewTripForm);
