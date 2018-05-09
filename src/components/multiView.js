import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { dayNamesArray } from './utils/dateObjectUtils';
import { setDashboardCurrentDay, setDashboardTripdays } from '../actions/dashboard';

class MultiView extends Component{

  componentWillMount(){
    this.assembleTripDays();
  }
  //handle clicking a div to set our current date on the dash and redirect to
  // one day view after filtering cards with matching date/

  //myDate.setHours(myDate.getHours() + 24)
  assembleTripDays(){
    let start = new Date(this.props.dateStart);
    let end = this.props.dateEnd;
    end = new Date(end.setHours(end.getHours() + 24))
    let tripDays =[];
    while(start.getDate()!==end.getDate()){
      let date = new Date(start);
      console.log(date);
      tripDays.push(date);
      console.log(tripDays)
      start = new Date(start.setHours(start.getHours()+24));
    }
    console.log(tripDays);
    this.props.dispatch(setDashboardTripdays(tripDays));
  }
  handleRedirect(date){
    console.log('changing dash current date to',date);
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
    console.log(this.props.currentItinerary)
    let wee = this.assembleTripSpread();
    return(
      <div>
        <p style={{'display':'block'}}>MultiView Component</p>
        <ul>
          {wee}
        </ul>
      </div>
    )
  }
};
const mapStateToProps = (state) => ({
  dateStart:state.dashboard.currentItinerary.dateStart,
  dateEnd:state.dashboard.currentItinerary.dateEnd,
  tripDays:state.dashboard.tripDays,
  currentItinerary: state.dashboard.currentItinerary
  // dateStart:'woo',
  // dateEnd:'woooo'
});

export default connect(mapStateToProps)(MultiView);


/*
<Link to='/mock'>Mockups</Link>
<Route path="/login" component={Login} />
*/
