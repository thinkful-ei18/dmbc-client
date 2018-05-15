import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { dayNamesArray } from './utils/dateObjectUtils';
import { setDashboardCurrentDay, setDashboardTripdays } from '../actions/dashboard';
import { fetchTripDetailsById } from '../actions/tripForm';
import MiniBlock from "./mini-block";
import ViewButton from './buttons/viewButton'
import BackgroundImage from '../assets/la-large.jpg'


import '../styles/multiView.css';

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

  isAllNull(block) {
    return block.findIndex(item => item !== null) === -1
  }

  assembleTripSpread(){
    if(this.props.tripDays===undefined){
      return <li className='loading-trip-spread'>loading</li>
    }
    const tripSpread = this.props.tripDays.map((day,index) => {
      const parsedDate = `${dayNamesArray[day.getDay()]} ${day.toDateString().slice(4, -5)}`
      const blocks = this.props.currentItinerary.blocks;
      let filteredBlocks = blocks.filter(block => day.toDateString() === block.date.toDateString())
      let block = filteredBlocks.map((block, index) => {
          let timelineSymbol
          if(index!==filteredBlocks.length-1){
            timelineSymbol = (
              <div className="timeline-symbol">
                <i className="far fa-circle"></i>
                <hr/>
              </div>
            )
          }
          else{
             timelineSymbol = (
               <div className="timeline-symbol">
                 <i className="far fa-circle"></i>
               </div>

             )
          }
          return (
            <div className="mini-block-container"  key={index}>
              {/* {timelineSymbol} */}
              <MiniBlock
                block={block}
                index={index}
                length={filteredBlocks.length}
                timelineSymbol={timelineSymbol}
              />
            </div>
          )
      })
      if (this.isAllNull(block)) {
        block = (
          <p className="no-blocks">You haven't created a block for this day yet.</p>
        )
      }
      return(
        <Link to="/oneDayView" onClick={() => this.handleRedirect(day)} className="one-day-link" key={index}>
          <li className="multi-view-day">
            <div className="multi-day-header">
              <h2 className="block-date">{parsedDate}</h2>
              {/* <button className="go-to-day">Go to day</button> */}
              <ViewButton buttonText={'Go To Day'} overrideStyle={
                {
                  marginRight: '25px',
                  marginTop: '15px'
                }
              }/>
            </div>
            {block}
          </li>
        </Link>
      )
    })
    return tripSpread;
  };

  render(){
    let trips = this.assembleTripSpread();
    let tripDetails = (
      <div className="trip-details">
        <h1 className="itinerary-header">We are loading your trip</h1>
      </div>
    );

    if (this.props.currentItinerary) {
      tripDetails = (
        <div className="trip-details" style={{backgroundImage: `url(${BackgroundImage})`}}>
          <h1 className="itinerary-header">{this.props.currentItinerary.destination.locationName}</h1>
          <h2 className="itinerary-dates">{this.props.currentItinerary.dateStart.toDateString()} to {this.props.currentItinerary.dateEnd.toDateString()}</h2>
          <p className="ambassador-info">Your ambassador is {this.props.currentItinerary.ambassador.name}</p>
        </div>
      )
    }
    return(
      <div className="multi-view">
        {tripDetails}
        <ul>
          {trips}
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
