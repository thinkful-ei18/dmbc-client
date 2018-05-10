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
    const apiTags = ['Family Friendly', 'Crowd Friendly', 'No Pets'];

    const placeTags = apiTags.map((tag,index) => {
      return (<li key={index}>{tag}</li>)
    });
    let searchResults;
    if (this.props.yelp.length > 0) {
      searchResults = this.props.yelp.map((result, index) => {
        let location = `${result.location.address1}, ${result.location.city}, ${result.location.state}, ${result.location.zip_code}`;
        return (
          <div className='cardContainer-expanded' key={index}>
            <div className='cardHeader' style={{'backgroundImage':`url(${result.image_url})`}}>
              <span className='placeName'>{result.name}</span>
            </div>
            <div className='placeTags'>
              <ul>
                {placeTags}
              </ul>
            </div>
            <div>
              <div className='cardBody'>
                <span className='blurbHeader'>Details</span>
                <span className='cardBlurb'>
                  {location}
                </span>
              </div>
              <div className='cardControls'>
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
            </div>
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
    let latitude = this.props.destination.location.coordinates[1];
    let longitude = this.props.destination.location.coordinates[0];
    return (
      <div className="yelp-search">
        <form onSubmit={event => {
          event.preventDefault();
          this.offset = 0;
          this.props.dispatch(fetchYelp(latitude, longitude, this.term.value, this.offset));
        }}>
          <label htmlFor="searchterm">Term</label>
          <input ref={input => this.term = input} placeholder="searchterm" name="searchterm"/>
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