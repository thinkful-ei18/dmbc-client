import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { dayNamesArray } from './utils/dateObjectUtils';
import { setDashboardCurrentDay, setDashboardTripdays } from '../actions/dashboard';

class MultiView extends Component{

  componentWillMount(){
    console.log('multiview has mounted', this.props)
    this.assembleTripDays();
  }
  //handle clicking a div to set our current date on the dash and redirect to
  // one day view after filtering cards with matching date/

  //myDate.setHours(myDate.getHours() + 24)
  assembleTripDays(){
    let start = new Date(this.props.dateStart);
    let end = this.props.dateEnd;
    let tripDays =[];

    while(start.getDate()!==end.getDate()+1){
      let date = start;
      tripDays.push(date);
      start = new Date(start.setHours(start.getHours()+24));
    }
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
      return(
        //needs refactor to componenet.
        <li key={index} style={{'border':'1px solid red'}}>
          <h2>{dayNamesArray[day.getDay()]}</h2>
          <Link to="/oneDayView" onClick={() => this.handleRedirect(day)}> go to day </Link>
        </li>
      )
    })
    return tripSpread;
  };
  render(){
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
  tripDays:state.dashboard.tripDays
  // dateStart:'woo',
  // dateEnd:'woooo'
});

export default connect(mapStateToProps)(MultiView);


/*
<Link to='/mock'>Mockups</Link>
<Route path="/login" component={Login} />
*/
