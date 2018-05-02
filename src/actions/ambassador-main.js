import { API_BASE_URL } from '../config';

export const FETCH_ITINERARIES_REQUEST = 'FETCH_ITINERARIES_REQUEST';
export const fetchItinerariesRequest = () => ({
	type: FETCH_ITINERARIES_REQUEST
});

export const FETCH_ITINERARIES_SUCCESS = 'FETCH_ITINERARIES_SUCCESS';
export const fetchItinerariesSuccess = itineraries => ({
	type: FETCH_ITINERARIES_SUCCESS,
	itineraries
});

export const FETCH_ITINERARIES_ERROR = 'FETCH_ITINERARIES_ERROR';
export const fetchItinerariesError = error => ({
	type: FETCH_ITINERARIES_ERROR,
	error
});

export const fetchItineraries = () => dispatch => {
	dispatch(fetchItinerariesRequest());
	fetch(`${API_BASE_URL}/itineraries`)
		.then(res => {
			if (!res.ok) {
				return Promise.reject(res.statusText);
			}
			return res.json();
		})
		.then(itineraries => {
			console.log('ACTIONS', itineraries);
			dispatch(fetchItinerariesSuccess(itineraries));
		})
		.catch(err => {
			dispatch(fetchItinerariesError(err));
		});
};
