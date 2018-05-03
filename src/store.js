import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import authReducer from './reducers/auth';
import userReducer from './reducers/users';
import tripReducer from './reducers/tripForm';
import blockReducer from './reducers/block';
import dashboardReducer from './reducers/dashboard';

import {loadAuthToken} from './local-storage';
import {setAuthToken, refreshAuthToken} from './actions/auth';

const store = createStore(
  combineReducers({
    block: blockReducer,
    trip: tripReducer,
    dashboard:dashboardReducer,
    form: formReducer,
    auth: authReducer,
    users: userReducer
  }),
  applyMiddleware(thunk));

const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;
