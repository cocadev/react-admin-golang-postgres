import * as Type from '../actions/types.js';
import _ from 'underscore'

const initState = function () {
  return {
    hotel:{
      general:"",
      descriptions:[],
      images:[],
      rooms:[],
      facilities:[],
    },
    hotels:{
      total:0,
      pageSize:10,
      offset:0,
      hotels:[]
    }
  };

}

export default function (state = initState(), action = {}) {
  switch (action.type) {
    case Type.HOTEL_LIST:
      return Object.assign({}, state, {
        hotels: action.data,
      });
    case Type.HOTEL_GET:
      return Object.assign({}, state, {
        hotel: action.data,
      });
    default:
      return state;
  }
}
