import backendUnAuthAxios from '../apis/axios/backendUnAuthAxios';
import backendAxios from '../apis/axios/backendAxios';
import { AUTH_CLIENT_AUTH, AUTH_CLIENT_UNAUTH, AUTH_USER_AUTH, AUTH_USER_UNAUTH, USER_INFO_SET, AUTH_SET_REDIRECT_PATH } from './types';
import Token from "../apis/auth/token";
import LocalStore, { USER_INFO, USER_CURRCOM } from "../common/localStore";

export const loginAsync = (username, password) => dispatch =>
  backendUnAuthAxios.post('/login',
    {
      username: username,
      password: password
    }).then(function (response) {

    var data = response.data;

    console.log('login result', data)
    if (!data.token || !data.user) {
      throw new Error();
    }

    return data;

  }).catch(function (error) {
    dispatch({
      type: AUTH_USER_UNAUTH,
      payload: error.msg
    });

    if (error.message) {
      throw new Error(error.message);
    }
    else if (error.response.data) {
      throw new Error(JSON.parse(error.response.data));
    }

    throw new Error();
  });


export const guardAuth = (token) => {
  Token.set(token);
  return { type: AUTH_USER_AUTH };
};

export const setRedirectedFrom = (path) => {
  return { type: AUTH_SET_REDIRECT_PATH, path:path };
};

export const logout = (msg) => {
  Token.del();
  LocalStore.del(USER_INFO);
  LocalStore.del(USER_CURRCOM);
  return dispatch => {
    dispatch({
      type: AUTH_USER_UNAUTH,
      payload: msg
    });
  };
}
