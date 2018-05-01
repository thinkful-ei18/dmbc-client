import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'; 
export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'; 
export const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  users
});

export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR'; 
export const fetchUsersError = error => ({
  type: FETCH_USERS_ERROR,
  error
});

// export const fetchUsers = users => dispatch => {
//   dispatch(fetchUsersRequest());
//   return fetch(`${API_BASE_URL}/users`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//     .then(res => {
//       return res.json();
//     })
//     .then(users => {
//       dispatch(fetchUsersSuccess(users));
//     })
//     .catch(err => {dispatch(fetchUsersError(err))});
// }

export const registerUser = user => dispatch => {
  return fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(user)
  })
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .catch(err => {
          const {reason, message, location} = err;
          if (reason === 'ValidationError') {
              // Convert ValidationErrors into SubmissionErrors for Redux Form
              return Promise.reject(
                  new SubmissionError({
                      [location]: message
                  })
              );
          }
      });
};