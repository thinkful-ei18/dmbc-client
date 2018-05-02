import {API_BASE_URL} from '../config';

export const SET_DATE_START = 'SET_DATE_START';
export const setDateStart = (dateStart) => ({
  type:SET_DATE_START,
  dateStart
});

export const SET_DATE_END = 'SET_DATE_END';
export const setDateEnd = (dateEnd) => ({
  type:SET_DATE_END,
  dateEnd
});

export const SET_TRIP_DESTINATION = 'SET_TRIP_DESTINATION'
export const setTripDestination = (location) => ({
  type:SET_TRIP_DESTINATION,
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
  console.log('sendingreq stringified',JSON.stringify(tripDetails));
  const authToken = getState().auth.authToken;
  dispatch(pushTripDetailsRequest());
  return fetch(`${API_BASE_URL}/itinerary`,{
    method:'POST',
    headers:{
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(tripDetails)
  })
  .then((res) => dispatch(pushTripDetailsSuccess(res)))
  .catch((err) => dispatch(pushTripDetailsError(err)) )
}
