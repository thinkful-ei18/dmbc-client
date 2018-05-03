import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./reducers/auth";
import userReducer from "./reducers/users";
import tripReducer from "./reducers/trip";
import ambassadorItinerariesReducer from "./reducers/ambassador-itineraries";
import { loadAuthToken } from "./local-storage";
import { setAuthToken, refreshAuthToken } from "./actions/auth";

const store = createStore(
  combineReducers({
    trip: tripReducer,
    form: formReducer,
    auth: authReducer,
    users: userReducer,
    itineraries: ambassadorItinerariesReducer
  }),
  applyMiddleware(thunk)
);

const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;
