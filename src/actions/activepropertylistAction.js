import backendAxios from '../apis/axios/backendAxios';
import * as Type from '../actions/types.js';

export const loadActivePropertyLists = (query) => {
  return (dispatch)=>{
    backendAxios.get('/admins/activepropertylists?query=' + query,
      {}).then(function (response) {

      var data = response.data;

      dispatch({
        type : Type.ACTIVEPROPERTYLIST_LIST,
        data : data
      });

    }).catch(function (error) {
      console.log('error', error)
      //throw new Error();
    });
  }
};


export const loadMainHotels = ( name,offset) => {

  return (dispatch)=>{
    backendAxios.get('/admins/activepropertylists?name=' + name + '&offset=' + offset,
      {}).then(function (response) {

      var data = response.data;

      dispatch({
        type : Type.ACTIVEPROPERTYLIST_LIST,
        data : data
      });

    }).catch(function (error) {
      console.error(error)
      //throw new Error();
    });
  }
};

export const viewHotel = (hotelId) => {
  return (dispatch)=>{
    backendAxios.get('/admins/activepropertylists/' + hotelId,
      {}).then(function (response) {
      var data = response.data;
      console.log('d');
      dispatch({
        type : Type.ACTIVEPROPERTYLIST_GET,
        data : data
      });

    }).catch(function (error) {
      console.error(error)
    });
  }
};

export const updateMainHotel = (data) => {
  return (dispatch)=>{
    dispatch({
      type : Type.ACTIVEPROPERTYLIST_UPDATE,
      data : data
    });
  }
}

export const updateMapCheck = (data) => {
  return (dispatch)=>{
    dispatch({
      type : Type.HOTEL_UPDATE,
      data : data
    });
  }
};

export const updateMainHotelDo = (data) =>
  dispatch=>
    backendAxios.put('/admins/activepropertylists/' + data.id,
      data).then ((response) => {
      var data = response.data;
      dispatch({
        type : Type.ACTIVEPROPERTYLIST_UPDATE_DO,
        data : data
      });
      return data
    }).catch(function (error) {
      console.log('error', error)
      //throw new Error();
    })


//Mapping parts
export const loadHotels = (providerId, query, offset) => {
  return (dispatch)=>{
    backendAxios.get('/admins/hotels?providerId='+ providerId +'&query=R' + query + '&starRating=1&limit=10&offset=' + offset,
      {}).then(function (response) {
      var data = response.data;
      dispatch({
        type : Type.SUPPLIERMAP_LIST,
        data : data
      });

    }).catch(function (error) {
      console.error(error)
      //throw new Error();
    });
  }
};

export const viewMap = (clarifiId) => {
  return (dispatch)=>{
    backendAxios.get('/admins/clarifipropertymappings?supplierId=' + clarifiId,
      {}).then(function (response) {
       var myid = response.data[0].clarifiId;

        backendAxios.get('/admins/clarifipropertymappings?clarifiId=' + myid,
          {}).then(function (response) {
          var data = response.data;
          dispatch({
            type : Type.SUPPLIERMAP_UPDATE_DO,
            data : data
          });

        }).catch(function (error) {
          console.error(error)
        });

    }).catch(function (error) {
      console.error(error)
    });
  }
};

//Map View Content
export const MapViewHotels = (providerId, hotelId) => {
  return (dispatch)=>{
    backendAxios.get('/admins/hotels/'+providerId+'/'+hotelId,
      {}).then(function (response) {
      var data = response.data;
      dispatch({
        type : Type.HOTEL_LIST,
        data : data
      });

    }).catch(function (error) {
      console.error(error)
      //throw new Error();
    });
  }
};


export const postMapCheck = (data) =>
  dispatch=>
    backendAxios.post('/admins/clarifipropertymappings',
      data).then ((response) => {
        console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaa', data)
        console.log('responseeeeeeeeeeeeeeeeeeeeee', response.data)
      dispatch({
        type : Type.SUPPLIERMAP_ADD_DO,
        data : data
      });
      return data
    }).catch(function (error) {
      console.log('error', error)
      //throw new Error();
    })
