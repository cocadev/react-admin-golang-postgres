import Axios from 'axios';
import * as Config from "../../config";
import store from "../../store";
import {AUTH_USER_SESSIONEXP} from '../../actions/types';
import Token from "../auth/token";

const API_ROOT = "";
const Auth_Type = "Bearer"

const backendInstance = Axios.create({
  baseURL: `${Config.BACKEND_API_URL}${API_ROOT}`,
});

//Request interceptor
backendInstance.interceptors.request.use(function (config) {
  let state = store.getState();

  const tokenStatus = Token.getStatus();
  if(tokenStatus === 0 || tokenStatus === 2)
  {
    TokenExpried();
  }

  config.headers.Authorization = Request_GetAuthHeader();
  return config;
}, function (error) {
  return Promise.reject(error);
});

//Response interceptor
backendInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const { config, response: { status } } = error;
  const originalRequest = config;
  //unauth try refrsh
  if (status === 401) {
    //token expried
    TokenExpried();
    return Promise.reject(error);
  }

  return Promise.reject(error);
});

const Request_GetAuthHeader = function () {
  let token = Token.get();
  return `${Auth_Type} ${token}`;
}

const Request_GetCompanyFilter = function () {
  let state = store.getState();
  let companyID = state.user.currCompanyID == null? 0 :  state.user.currCompanyID;
  return companyID;
}

//TODO show some warning.
const TokenExpried = function () {

  store.dispatch({
    type:AUTH_USER_SESSIONEXP,
    payload:'Session Expried'
  });

}

export default backendInstance;
