import {API_BASE_URL} from '../config';

export const SET_START_DATE = 'SET_START_DATE';
export const setStartDate = (startDate) => ({
  type:SET_START_DATE,
  startDate
});

export const SET_END_DATE = 'SET_END_DATE';
export const setEndDate = (endDate) => ({
  type:SET_END_DATE,
  endDate
});

export const SET_TRIP_LOCATION = 'SET_TRIP_LOCATION'
export const setTripLocation = (location) => ({
  type:SET_TRIP_LOCATION,
  location
});

export const SET_TRIP_PARTNERS = 'SET_TRIP_PARTNERS'
export const setTripPartners = (partners) => ({
  type:SET_TRIP_PARTNERS,
  partners
});

export const PUSH_TRIP_DETAILS_REQUEST = 'PUSH_TRIP_DETAILS_REQUEST';
export const pushTripDetailsRequest = () =>({
  type:PUSH_TRIP_DETAILS_REQUEST
});

export const PUSH_TRIP_DETAILS_SUCCESS = 'PUSH_TRIP_DETAILS_SUCCES';
export const pushTripDetailsSuccess = (response) =>({
  type:PUSH_TRIP_DETAILS_SUCCESS,
  response

});

export const PUSH_TRIP_DETAILS_ERROR = 'PUSH_TRIP_DETAILS_ERROR';
export const pushTripDetailsError = (err) =>({
  type:PUSH_TRIP_DETAILS_ERROR,
  err
});

export const PUSH_TRIP_DETAILS = 'PUSH_TRIP_DETAILS';
export const pushTripDetails = (tripDetails) => (dispatch, getState) => {
  console.log('sendingreq',tripDetails)
  const authToken = getState().auth.authToken;
  dispatch(pushTripDetailsRequest());
  return fetch(`${API_BASE_URL}/itinerary`,{
    method:'POST',
    headers:{
      Authorization: `Bearer ${authToken}`,
    },
    body:JSON.stringify(tripDetails)
  })
  .then((res) => dispatch(pushTripDetailsSuccess(res)))
  .catch((err) => dispatch(pushTripDetailsError(err)) )
}
