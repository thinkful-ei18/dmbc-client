import {
  FETCH_YELP_REQUEST,
  FETCH_YELP_SUCCESS,
  FETCH_YELP_ERROR,
  CLEAR_YELP
} from "../actions/yelp";

const initialState = {
  yelp: [],
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_YELP_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === FETCH_YELP_SUCCESS) {
    return Object.assign({}, state, {
      yelp: action.yelp,
      loading: false,
      error: null
    });
  } else if (action.type === FETCH_YELP_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === CLEAR_YELP) {
    return Object.assign({}, state, {
      yelp: action.clear
    });
  }
  return state;
}
