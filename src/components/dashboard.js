import React from 'react';
import {connect} from 'react-redux';

import requiresLogin from '../requires-login';
import Logout from './logout';
import NewTripForm from './newTrip-form';

//actions
import { fetchTripDetails } from '../actions/tripForm';

import MultiView from './multiView.js';

export class Dashboard extends React.Component {
  componentDidMount(){
    console.log('dash mounted');
    this.props.dispatch(fetchTripDetails());
  }
  render () {
    return (
      <div className="dashboard">
        Hello from the Dashboard!
        {this.props.currentItinerary ? <MultiView /> : <NewTripForm />}
        <Logout />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentItinerary:state.dashboard.currentItinerary,
  currentUser: state.auth.currentUser
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
