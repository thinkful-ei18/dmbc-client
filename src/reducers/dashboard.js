import {FETCH_TRIP_DETAILS_SUCCESS} from '../actions/tripForm.js'

const initialState = {
  currentItinerary:undefined,
  currentDay:undefined,
}

export default function reducer(state = initialState, action){
  switch (action.type) {
    case FETCH_TRIP_DETAILS_SUCCESS:
      return{
        ...state,
        currentItinerary:action.tripDetails
      }
    default:
      return state;

  }
}
