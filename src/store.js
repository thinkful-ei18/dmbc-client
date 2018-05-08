import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import authReducer from './reducers/auth';
import userReducer from './reducers/users';
import tripReducer from './reducers/tripForm';
import blockReducer from './reducers/block';
import cardReducer from './reducers/cards';
import dashboardReducer from './reducers/dashboard';
import ambassadorItinerariesReducer from "./reducers/ambassador-itineraries";
import yelpReducer from './reducers/yelp';


import {loadAuthToken} from './local-storage';
import {setAuthToken, refreshAuthToken} from './actions/auth';

const middlewares = [thunk];
let enhancers;


if (process.env.NODE_ENV === 'development') {
  enhancers = compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
} else {
  enhancers = applyMiddleware(...middlewares)
}


const store = createStore(
  combineReducers({
    block: blockReducer,
    trip: tripReducer,
    dashboard:dashboardReducer,
    form: formReducer,
    auth: authReducer,
    users: userReducer,
    cards: cardReducer,
    itineraries: ambassadorItinerariesReducer,
    yelp: yelpReducer
  }),
  {},
  enhancers
);

const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;
