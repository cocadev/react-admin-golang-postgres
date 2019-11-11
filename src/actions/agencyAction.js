import backendUnAuthAxios from '../apis/axios/backendUnAuthAxios';
import backendAxios from '../apis/axios/backendAxios';

import * as Type from '../actions/types.js';
import LocalStore, { USER_INFO, USER_CURRCOM } from "../common/localStore";

export const loadAgencyList = (query) => {
  return (dispatch)=>{
    backendAxios.get('/admins/agencies?query=' + query,
      {}).then(function (response) {

      var data = response.data;

      dispatch({
        type : Type.AGENCY_LIST,
        data : data
      });

    }).catch(function (error) {
      console.log('error', error)
      //throw new Error();
    });
  }
}

export const getAgency = (id) => {
  return (dispatch)=>{
    backendAxios.get('/admins/agencies/' + id,
      {}).then(function (response) {

      var data = response.data;
      dispatch({
        type : Type.AGENCY_GET,
        data : data
      });

    }).catch(function (error) {
      console.log('error', error)
      //throw new Error();
    });
  }
}

export const updateAgency = (agency) => {
  return (dispatch)=>{
    dispatch({
      type : Type.AGENCY_UPDATE,
      data : agency
    });
  }
}

export const createAgency = (agency) => {
  return (dispatch)=>{
    dispatch({
      type : Type.AGENCY_ADD,
      data : agency
    });
  }
}

export const createAgencyDo = (data) =>
    dispatch=>
      backendAxios.post('/admins/agencies',
        data).then ((response) => {
        var data = response.data;
        dispatch({
          type : Type.AGENCY_ADD_DO,
          data : data
        });
        return data
      }).catch(function (error) {
        console.log('error', error)
        //throw new Error();
      })

export const updateAgencyDo = (data) =>
   dispatch=>
    backendAxios.put('/admins/agencies/' + data.id,
      data).then ((response) => {
      var data = response.data;
      dispatch({
        type : Type.AGENCY_UPDATE_DO,
        data : data
      });
      return data
    }).catch(function (error) {
      console.log('error', error)
      //throw new Error();
    })
export const deleteAgency = (data) =>
  dispatch=>
    backendAxios.delete('/admins/agencies/' + data.id,
      data).then ((response) => {
      var data = response.data;
      dispatch({
        type : Type.AGENCY_DELETE,
        data : data
      });
      return data
    }).catch(function (error) {
      console.log('error', error)
      //throw new Error();
    })
