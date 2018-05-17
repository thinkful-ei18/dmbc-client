import {
  FETCH_CARDS_REQUEST,
  FETCH_CARDS_SUCCESS,
  FETCH_SINGLE_CARD_SUCCESS,
  FETCH_CARDS_ERROR,
  FETCH_FILTER_CARDS_SUCCESS
} from "../actions/cards";

const initialState = {
  cards: [],
  singleCard: {},
  loading: false,
  error: null,
  filtered: false
};

export default function cardReducer(state = initialState, action) {
  if (action.type === FETCH_CARDS_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === FETCH_CARDS_SUCCESS) {
    return Object.assign({}, state, {
      cards: action.cards,
      loading: false,
      error: null,
      filtered: false
    });
  } else if (action.type === FETCH_SINGLE_CARD_SUCCESS) {
    return Object.assign({}, state, {
      singleCard: action.singleCard,
      loading: false,
      error: null
    });
  } else if (action.type === FETCH_CARDS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === FETCH_FILTER_CARDS_SUCCESS) {
    return Object.assign({}, state, {
      cards: action.cards,
      loading: false,
      error: null,
      filtered: true
    });
  } else {
    return state;
  }
}
