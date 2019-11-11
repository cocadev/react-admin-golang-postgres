import backendUnAuthAxios from '../apis/axios/backendUnAuthAxios';
import backendAxios from '../apis/axios/backendAxios';

import * as Type from '../actions/types.js';
import LocalStore, { USER_INFO, USER_CURRCOM } from "../common/localStore";

export const loadProviderList = (query) => {
  return (dispatch)=>{
    return backendAxios.get('/admins/providers?query=' + query,
      {}).then(function (response) {

      var data = response.data;

      dispatch({
        type : Type.PROVIDER_LIST,
        data : data
      });

      return {
        data
      }
    }).catch(function (error) {
      console.log('error', error)
      return {
        error
      }
    });
  }
};

export const getProvider = (id) => {
  return (dispatch)=>{
    backendAxios.get('/admins/providers/' + id,
      {}).then(function (response) {

      var data = response.data;

      dispatch({
        type : Type.PROVIDER_GET,
        data : data
      });

    }).catch(function (error) {
      console.log('error', error)
      //throw new Error();
    });
  }
}

export const updateProvider = (provider) => {
  return (dispatch)=>{
    dispatch({
      type : Type.PROVIDER_UPDATE,
      data : provider
    });
  }
}

export const createProvider = (provider) => {
  return (dispatch)=>{
    dispatch({
      type : Type.PROVIDER_ADD,
      data : provider
    });
  }
}

export const createProviderDo = (data) =>
  dispatch=>
    backendAxios.post('/admins/providers',
      data).then ((response) => {
      dispatch({
        type : Type.PROVIDER_ADD_DO,
        data : data
      });
      return data
    }).catch(function (error) {
      console.log('error', error)
      //throw new Error();
    })

export const updateProviderDo = (data) =>
   dispatch=>
    backendAxios.put('/admins/providers/' + data.id,
      data).then ((response) => {
      dispatch({
        type : Type.PROVIDER_UPDATE_DO,
        data : data
      });
      return data
    }).catch(function (error) {
      console.log('error', error)
      //throw new Error();
    })
export const deleteProvider = (data) =>
  dispatch=>
    backendAxios.delete('/admins/providers/' + data.id,
      data).then ((response) => {
      var data = response.data;
      dispatch({
        type : Type.PROVIDER_DELETE,
        data : data
      });
      return data
    }).catch(function (error) {
      console.log('error', error)
      //throw new Error();
    });
