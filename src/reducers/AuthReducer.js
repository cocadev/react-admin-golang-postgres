import { AUTH_USER_AUTH, AUTH_USER_UNAUTH,AUTH_USER_SESSIONEXP, AUTH_SET_REDIRECT_PATH } from '../actions/types';
import Token from "../apis/auth/token";

const stateInit = function() {
  return {
    userAuth: Token.getStatus(),
    error: null,
    redirectedFrom:null
  }
}
export default function reducer(state=stateInit(), action) {

  switch (action.type) {
    case AUTH_USER_UNAUTH:
      return Object.assign({}, state, {
        userAuth: 0,
        error: action.payload
      });
    case AUTH_USER_AUTH:
      return Object.assign({}, state, {
        userAuth: 1,
        error:null
      });
    case AUTH_SET_REDIRECT_PATH:
      return Object.assign({}, state, {
        redirectedFrom: action.path,
      });
    case AUTH_USER_SESSIONEXP:
      return Object.assign({}, state, {
        userAuth: 2
      });
  }

  return state;
}
