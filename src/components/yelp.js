import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../requires-login';

import '../styles/oneDayView.css';
import { fetchYelp } from '../actions/yelp';
import CreateCard from './create-card';

export class Yelp extends React.Component {
  constructor() {
    super();
    
    this.state = {
      create: false,
      name: '',
      location: '',
      latitude: '',
      longitude: ''
    }
  }
  render() {
    console.log(this.props.yelp)
    let searchResults;
    if (this.props.yelp.length > 0) {
      searchResults = this.props.yelp.map((result, index) => {
        let location = `${result.location.address1}, ${result.location.city}, ${result.location.state}, ${result.location.zip_code}`;
        return (
          <div key={index}>
            <img src={result.image_url} alt={result.name} style={{width: '300px', height: '300px'}}/>
            <p>{result.name}</p>
            <p>{location}</p>
            <button onClick={event => {
              event.preventDefault();
              this.setState({
                create: true,
                name: result.name,
                location: location,
                latitude: result.coordinates.latitude,
                longitude: result.coordinates.longitude
              })
            }}>Choose this location</button>
          </div>
        )
      })
    }
    let nextButton;
    if (searchResults) {
      nextButton = (
      <div>
        <button disabled={this.offset ? '' : 'disabled'}
        onClick={event => {
          event.preventDefault();
          this.offset = this.offset - 1
          this.props.dispatch(fetchYelp(this.location.value, this.term.value, this.offset * 20))
        }}>Back</button>
        <button onClick={event => {
          event.preventDefault();
          this.offset = this.offset + 1
          this.props.dispatch(fetchYelp(this.location.value, this.term.value, this.offset * 20))
        }}>Next</button>
      </div>
    )}

    if (this.state.create) {
      return (
        <CreateCard 
          name={this.state.name}
          location={this.state.location}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
        />
      )
    }
    console.log()
    let latitude = this.props.destination.location.coordinates[1];
    let longitude = this.props.destination.location.coordinates[0];
    return (
      <div>
        <form onSubmit={event => {
          event.preventDefault();
          this.offset = 0;
          this.props.dispatch(fetchYelp(latitude, longitude, this.term.value, this.offset));
        }}>
          <label>Term</label>
          <input ref={input => this.term = input}/>
          <button>Submit</button>
        </form>
        {searchResults}
        {nextButton}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  yelp: state.yelp.yelp,
  loading: state.cards.loading,
  error: state.cards.error,
  destination:state.dashboard.currentItinerary.destination
});

export default requiresLogin()(connect(mapStateToProps)(Yelp));