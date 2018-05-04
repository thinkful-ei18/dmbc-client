import { 
  FETCH_CARDS_REQUEST,
  FETCH_CARDS_SUCCESS,
  FETCH_SINGLE_CARD_SUCCESS,
  FETCH_CARDS_ERROR
} from "../actions/cards";

const initialState = {
  cards: [],
  singleCard: [],
  loading: false,
  error: null
};

export default function cardReducer(state = initialState, action) {
  if (action.type === FETCH_CARDS_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    })
  }
  else if (action.type === FETCH_CARDS_SUCCESS) {
    return Object.assign({}, state, {
      cards: action.cards,
      loading: false,
      error: null
    })
  }
  else if (action.type === FETCH_SINGLE_CARD_SUCCESS) {
    return Object.assign({}, state, {
      singleCard: action.singleCard,
      loading: false,
      error: null
    })
  }
  else if (action.type === FETCH_CARDS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    })
  }
  else {
    return state;
  }
};