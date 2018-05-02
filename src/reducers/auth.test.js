import authReducer from './auth';
import {setAuthToken, clearAuth, authRequest, authSuccess, authError} from '../actions/auth';

describe('authReducer', () => {
  const authToken = '123456';
  const currentUser = 'cyang';
  const error = 'error';
  it('Should set the inital state when nothing is passed in', () => {
    const state = authReducer(undefined, {type: '__UNKNOWN'});
    expect(state).toEqual({
      authToken: null,
      currentUser: null,
      loading: false,
      error: null
    })
  });

  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = authReducer(currentState, {type: '__UNKNOWN'});
    expect(state).toBe(currentState);
  });

  describe('setAuthToken', () => {
    it('Should give a user an Auth Token when they login', () => {
      let state;
      state = authReducer(state, setAuthToken(authToken));
      expect(state).toEqual({
        authToken,
        currentUser: null,
        error: null,
        loading: false
      });
    })
  });

  describe('clearAuth', () => {
    it('Should clear an Auth Token when a user logs out', () => {
      let state;
      state = authReducer(state, clearAuth());
      expect(state).toEqual({
        authToken: null,
        currentUser: null,
        error: null,
        loading: false
      });
    })
  });

  describe('authRequest', () => {
    it('Should set loading to true', () => {
      let state;
      state = authReducer(state, authRequest());
      expect(state).toEqual({
        authToken: null,
        currentUser: null,
        error: null,
        loading: true
      });
    })
  });

  describe('authSuccess', () => {
    it('Should clear an Auth Token when a user logs out', () => {
      let state;
      state = authReducer(state, authSuccess(currentUser));
      expect(state).toEqual({
        authToken: null,
        currentUser,
        error: null,
        loading: false
      });
    })
  });

  describe('authError', () => {
    it('Should set error', () => {
      let state;
      state = authReducer(state, authError(error));
      expect(state).toEqual({
        authToken: null,
        currentUser: null,
        error,
        loading: false
      });
    })
  });
});