import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { dayNamesArray } from './utils/dateObjectUtils';
import { setDashboardCurrentDay, setDashboardTripdays } from '../actions/dashboard';
import { fetchTripDetailsById } from '../actions/tripForm';

class MultiView extends Component{
  componentDidMount(){
    if (this.props.match) {
      this.props.dispatch(fetchTripDetailsById(this.props.match.params.id))
      .then(() => {
        this.dateStart = this.props.currentItinerary.dateStart;
        this.dateEnd = this.props.currentItinerary.dateEnd;
        this.assembleTripDays();
      })
    } else {
      this.dateStart = this.props.currentItinerary.dateStart;
      this.dateEnd = this.props.currentItinerary.dateEnd;
      this.assembleTripDays();
    }
  }

  //handle clicking a div to set our current date on the dash and redirect to
  // one day view after filtering cards with matching date/

  assembleTripDays(){
    let start = new Date(this.dateStart);
    let end = this.dateEnd;
    let tripEnd = new Date(end.getTime());
    tripEnd = new Date(tripEnd.setHours(tripEnd.getHours() + 24))
    let tripDays =[];
    while(start.getDate()!==tripEnd.getDate()){
      let date = new Date(start);
      tripDays.push(date);
      start = new Date(start.setHours(start.getHours()+24));
    }
    this.props.dispatch(setDashboardTripdays(tripDays));
  }

  handleRedirect(date){
    this.props.dispatch(setDashboardCurrentDay(date));
  }

  assembleTripSpread(){
    if(this.props.tripDays===undefined){
      return <li className='loading-trip-spread'>loading</li>
    }
    const tripSpread = this.props.tripDays.map((day,index) => {
      const blocks = this.props.currentItinerary.blocks;
      const block = blocks.map((block, index) => {
        if (dayNamesArray[day.getDay()] === dayNamesArray[block.date.getDay()]) {
          return (
            <p key={index}>{block.title}</p>
          )
        }
        return null;
      })
      return(
        //needs refactor to componenet.
        <li key={index} style={{'border':'1px solid red'}}>
          <h2>{dayNamesArray[day.getDay()]}</h2>
          <Link to="/oneDayView" onClick={() => this.handleRedirect(day)}> go to day </Link>
          {block}
        </li>
      )
    })
    return tripSpread;
  };

  render(){
    let wee = this.assembleTripSpread();
    console.log(this.props)
    return(
      <div>
        <h1 className="itinerary-header">Trip Itinerary for {this.props.currentItinerary.destination.locationName}</h1>
        <h2 className="itinerary-dates">{this.props.currentItinerary.dateStart.toDateString()} to {this.props.currentItinerary.dateEnd.toDateString()}</h2>
        <p className="ambassador-info">Your ambassador is {this.props.currentItinerary.ambassador.name}</p>
        <p style={{'display':'block'}}>MultiView Component</p>
        <ul>
          {wee}
        </ul>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  tripDays:state.dashboard.tripDays,
  currentItinerary: state.dashboard.currentItinerary
});

export default connect(mapStateToProps)(MultiView);