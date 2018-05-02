import {
  SET_START_DATE,
  SET_END_DATE,
  SET_TRIP_LOCATION,
  SET_TRIP_PARTNERS
} from '../actions/trip'

const initialState={
  startDate: null,
  endDate:null,
  location:null,
  partners:'just me.',
}

export default function reducer(state = initialState, action){
  switch (action.type) {
    case SET_START_DATE:
      return {
        ...state,
        startDate:action.startDate
      }
    case SET_END_DATE:
      return{
        ...state,
        endDate:action.endDate
      }
    case SET_TRIP_LOCATION:
      return{
        ...state,
        location:action.location
      }
    case SET_TRIP_PARTNERS:
      return{
        ...state,
        partners:action.partners
      }

    default:
      return state;
  }
}
