import { FETCH_TRIP_DETAILS_SUCCESS } from '../actions/tripForm';
import {  SET_DASHBOARD_CURRENT_DAY, SET_DASHBOARD_TRIPDAYS } from '../actions/dashboard';
const initialState = {
  currentItinerary:undefined,
  tripDays:undefined,
  currentDay:undefined,
  userBlocks:[]
}

export default function reducer(state = initialState, action){
  switch (action.type) {
    case FETCH_TRIP_DETAILS_SUCCESS:
    console.log('destroy',action.tripDetails);
      return{
        ...state,
        currentItinerary:action.tripDetails,
        userBlocks:[action.tripDetails.blocks]
      }
    case SET_DASHBOARD_TRIPDAYS:
      return{
        ...state,
        tripDays:action.tripDays
      }
    case SET_DASHBOARD_CURRENT_DAY:
      return{
        ...state,
        currentDay:action.date
      }
    default:
      return state;

  }
}
