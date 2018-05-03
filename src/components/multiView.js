import React , {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import DaySpreads from './daySpreads';

import { setDashboardCurrentDay, setDashboardTripdays } from '../actions/dashboard';

class MultiView extends Component{

  componentWillMount(){
    this.assembleTripDays();
  }
  //handle clicking a div to set our current date on the dash and redirect to
  // one day view after filtering cards with matching date/

  //myDate.setHours(myDate.getHours() + 24)
  assembleTripDays(){
    let start = this.props.dateStart;
    let end = this.props.dateEnd;
    let tripDays =[];
    while(start.getDay()!==end.getDay()+1){
      let date = start;
      tripDays.push(date);
      start = new Date(start.setHours(start.getHours()+24));
    }
    this.props.dispatch(setDashboardTripdays(tripDays));
  }
  handleRedirect(date){
    console.log('changing dash current date to',date);
    this.props.dispatch(setDashboardCurrentDay(date));
    return (<Redirect to="/dayspreads" />)
  }
  assembleTripSpread(){
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    if(this.props.tripDays===undefined){
      return <li className='loading-trip-spread'>loading</li>
    }
    const tripSpread = this.props.tripDays.map((day,index) => {
      return(
        <li key={index}>
          <h2>{dayName[day.getDay()]}</h2>
          {/* <p onClick={() => this.handleRedirect(day)}>go to day</p> */}
          <Link to="/dayspreads" onClick={() => this.handleRedirect(day)}> go to day </Link>
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
          {/* this is a temp block with temp styles not final */}

          {/* <div
            style={{'width':'300px','height':'300px','border':'1px solid red','textAlign':'center'}}
            onClick={() => this.goToOneDayView()}
          >
            <Link to='/DaySpreads' />
            <h2>MONDAY</h2>
            <p>TEMPORARY DAY OBJECT</p>

          </div> */}



        {/* <DaySpreads /> */}
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
