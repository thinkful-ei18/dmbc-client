import * as actions from "../actions/ambassador-main";

const initialState = {
  intineraries: [],
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === actions.FETCH_ITINERARIES_REQUEST) {
    console.log("REDUCER");
    return Object.assign({}, state, {
      loading: true
    });
  }
  if (action.type === actions.FETCH_ITINERARIES_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      itineraries: action.itineraries
    });
  }
  if (action.type === actions.FETCH_ITINERARIES_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;
}
