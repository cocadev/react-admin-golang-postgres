import backendUnAuthAxios from '../apis/axios/backendUnAuthAxios';
import backendAxios from '../apis/axios/backendAxios';

import * as Type from '../actions/types.js';
import LocalStore, { USER_INFO, USER_CURRCOM } from "../common/localStore";


export const setUserInfo = (info) => {
    LocalStore.set(USER_INFO, info);
    return { type: Type.USER_INFO_SET, payload: info }
}

export const loadUsers = () => {
  return (dispatch)=>{
    backendAxios.get('/admins/users',
      {}).then(function (response) {

      var data = response.data;
      console.log('users', data)

      dispatch({
        type : Type.USER_LIST,
        data : data
      });

    }).catch(function (error) {
      console.error(error)
      //throw new Error();
    });
  }
}

export const getUser = (id) => {
  return (dispatch)=>{
    backendAxios.get('/admins/users/' + id,
      {}).then(function (response) {

      var data = response.data;
      dispatch({
        type : Type.USER_GET,
        data : data
      });

    }).catch(function (error) {
      console.error(error)
    });
  }
}
