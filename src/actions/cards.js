import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_CARDS_REQUEST = 'FETCH_CARDS_REQUEST';
export const fetchCardsRequest = () => ({
  type: FETCH_CARDS_REQUEST,
});

export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const fetchCardsSuccess = (cards) => ({
  type: FETCH_CARDS_SUCCESS,
  cards
});

export const FETCH_SINGLE_CARD_SUCCESS = 'FETCH_SINGLE_CARD_SUCCESS';
export const fetchSingleCardSuccess = singleCard => ({
  type: FETCH_SINGLE_CARD_SUCCESS,
  singleCard
})

export const FETCH_CARDS_ERROR = 'FETCH_CARDS_ERROR';
export const fetchCardsError = (err) => ({
  type: FETCH_CARDS_ERROR,
  err
});

export const fetchCards = cards => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(fetchCardsRequest());
  return fetch(`${API_BASE_URL}/cards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      return res.json();
    })
    .then(cards => {
      dispatch(fetchCardsSuccess(cards));
    })
    .catch(err => {dispatch(fetchCardsError(err))});
}

export const fetchSearchCards = searchTerm => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(fetchCardsRequest());
  return fetch(`${API_BASE_URL}/cards?searchTerm=${searchTerm}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      return res.json();
    })
    .then(cards => {
      dispatch(fetchCardsSuccess(cards));
    })
    .catch(err => {dispatch(fetchCardsError(err))});
}

export const fetchSingleCard = cardID => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(fetchCardsRequest());
  return fetch(`${API_BASE_URL}/cards/${cardID}`, {
    method: 'GET',
    headers: {
        // Provide our auth token as credentials
        Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      return res.json();
    })
    .then(card => {
      dispatch(fetchSingleCardSuccess(card));
    })
    .catch(err => {dispatch(fetchCardsError(err))});
}

export const addCard = card => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  console.log(card);
  return fetch(`${API_BASE_URL}/cards`, {
      method: 'POST',
      headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({
        ...card
      })
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

export const updateCard = (newCard, cardID) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(fetchCardsRequest());
  return fetch(`${API_BASE_URL}/cards/${cardID}`, {
    method: 'PUT',
    body: JSON.stringify(newCard),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // Provide our auth token as credentials
        Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      return res.json();
    })
    .then(card => {
      dispatch(fetchSingleCardSuccess(card));
    })
    .catch(err => {dispatch(fetchCardsError(err))});
}

export const deleteCard = (cardID) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(fetchCardsRequest());
  return fetch(`${API_BASE_URL}/cards/${cardID}`, {
    method: 'DELETE',
    headers: {
        Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {dispatch(fetchCardsError(err))});
}