import backendAxios from '../apis/axios/backendAxios';

import * as Type from '../actions/types.js';

export const getReports = () => {
  return (dispatch)=>{
    backendAxios.get('/admins/reports',
      {}).then(function (response) {

      var data = response.data;
      console.log('reports', data)

      dispatch({
        type : Type.REPORT_LIST,
        data : data
      });

      return data;
    }).catch(function (error) {
      console.error(error)
      //throw new Error();
    });
  }
}

export const createReport = (name) => (dispatch)=>
  backendAxios.get('/admins/reports/download/' + name,
    {}).then(function (response) {

    var data = response.data;
    console.log('report', data)

    dispatch({
      type : Type.REPORT_ADD,
      data : data
    });
    return data
  }).catch(function (error) {
    console.error(error)
    //throw new Error();
  })
