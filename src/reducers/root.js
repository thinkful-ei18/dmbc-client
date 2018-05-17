import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./auth";
import userReducer from "./users";
import tripReducer from "./tripForm";
import blockReducer from "./block";
import cardReducer from "./cards";
import dashboardReducer from "./dashboard";
import ambassadorItinerariesReducer from "./ambassador-itineraries";
import yelpReducer from "./yelp";

const appReducer = combineReducers({
  block: blockReducer,
  trip: tripReducer,
  dashboard: dashboardReducer,
  form: formReducer,
  auth: authReducer,
  users: userReducer,
  cards: cardReducer,
  itineraries: ambassadorItinerariesReducer,
  yelp: yelpReducer
});

export default function rootReducer(state, action) {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
}
