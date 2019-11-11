import backendUnAuthAxios from '../apis/axios/backendUnAuthAxios';
import backendAxios from '../apis/axios/backendAxios';
import * as Type from '../actions/types.js';

export const loadHotelList = (providerId, query, starRating, limit, offset) => {
  return (dispatch)=>{
    backendAxios.get('/admins/hotels?providerId=' + providerId + '&query=' + query + '&starRating=' + starRating + '&limit=' + limit + '&offset=' + offset,
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

export const getHotel = (providerId, hotelId) => {
  return (dispatch)=>{
    backendAxios.get('/admins/hotels/' + providerId + "/" + hotelId,
      {}).then(function (response) {

      var data = response.data;
      dispatch({
        type : Type.HOTEL_GET,
        data : data
      });

    }).catch(function (error) {
      console.error(error)
    });
  }
};

export const updateHotel = (hotel) => {
  return (dispatch)=>{
    dispatch({
      type : Type.HOTEL_UPDATE,
      data : hotel
    });
  }
}
