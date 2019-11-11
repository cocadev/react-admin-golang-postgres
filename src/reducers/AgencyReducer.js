import * as Type from '../actions/types.js';
import _ from 'underscore'

const initState = function () {

  return {
    agency:{},
    agencies:[],
  };

}

export default function (state = initState(), action = {}) {
  switch (action.type) {
    case Type.AGENCY_LIST:
      return Object.assign({}, state, {
        agencies: action.data,
      });
    case Type.AGENCY_GET:
      return Object.assign({}, state, {
        agency: action.data,
      });
    case Type.AGENCY_ADD_DO:
      return Object.assign({}, state, {
        agency: action.data,
      });
    case Type.AGENCY_ADD:
      return Object.assign({}, state, {
        agency: action.data,
      });
    case Type.AGENCY_UPDATE:
    case Type.AGENCY_UPDATE_DO:
      return Object.assign({}, state, {
        agency: action.data,
      });
    case Type.AGENCY_DELETE:
      var agencies = _.reject(state.agencies, (u)=>{
        return u.id == action.data.id
      })
      return Object.assign({}, state, {
        agencies: agencies
      });

    default:
      return state;
  }
}
