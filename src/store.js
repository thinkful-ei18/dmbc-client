import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "./reducers/root";
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
  rootReducer,
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
