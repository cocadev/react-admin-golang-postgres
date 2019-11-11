import backendUnAuthAxios from '../apis/axios/backendUnAuthAxios';
import backendAxios from '../apis/axios/backendAxios';

import * as Type from '../actions/types.js';
import LocalStore, { USER_INFO, USER_CURRCOM } from "../common/localStore";

export const getMapping = (providerId, supplierId) => {
  return (dispatch)=>{
    return backendAxios.get(`/admins/clarifipropertymappings/${providerId}/${supplierId}`,
      {}).then(function (response) {

      var data = response.data;

      dispatch({
        type : Type.GET_MAPPING,
        data : data
      });
      return {
        data
      }
    }).catch(function (error) {
      console.log('error', error)
      //throw new Error();
      return {
        error:error
      }
    });
  }
}

export const loadMappings = (clarifiId) => {
  return (dispatch)=>{
    backendAxios.get(`/admins/clarifipropertymappings/${clarifiId}`,
      {}).then(function (response) {

      var data = response.data;

      dispatch({
        type : Type.MAPPING_LIST,
        data : data
      });

    }).catch(function (error) {
      console.log('error', error)
      //throw new Error();
    });
  }
}

export const saveMapping = (data) =>
    dispatch=>
      backendAxios.post('/admins/clarifipropertymappings',
        data).then ((response) => {
        var data = response.data;
        dispatch({
          type : Type.SAVE_MAPPING,
          data : data
        });
        return data
      }).catch(function (error) {
        console.log('error', error)
        //throw new Error();
      })

export const deleteMapping = (clarifiId, providerId) =>
  dispatch=>
    backendAxios.delete(`/admins/clarifipropertymappings/${clarifiId}/${providerId}`,
      {}).then ((response) => {
      var data = response.data;
      dispatch({
        type : Type.MAPPING_DELETE,
        data : data
      });
      return data
    }).catch(function (error) {
      console.log('error', error)
      //throw new Error();
    })
