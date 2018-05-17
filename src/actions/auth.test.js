import {
  SET_AUTH_TOKEN,
  setAuthToken,
  USER_LOGOUT,
  clearAuth,
  AUTH_REQUEST,
  authRequest,
  AUTH_SUCCESS,
  authSuccess,
  AUTH_ERROR,
  authError
} from "./auth";

describe("Auth", () => {
  it("Should return the action", () => {
    const authToken = "Auth Token";
    const action = setAuthToken(authToken);
    expect(action.type).toEqual(SET_AUTH_TOKEN);
    expect(action.authToken).toEqual(authToken);
  });

  it("Should return the action", () => {
    const action = clearAuth();
    expect(action.type).toEqual(USER_LOGOUT);
  });

  it("Should return the action", () => {
    const action = authRequest();
    expect(action.type).toEqual(AUTH_REQUEST);
  });

  it("Should return the action", () => {
    const currentUser = "cyango";
    const action = authSuccess(currentUser);
    expect(action.type).toEqual(AUTH_SUCCESS);
    expect(action.currentUser).toEqual(currentUser);
  });

  it("Should return the action", () => {
    const error = "Error";
    const action = authError(error);
    expect(action.type).toEqual(AUTH_ERROR);
    expect(action.error).toEqual(error);
  });
});
