import * as Type from '../actions/types.js';
import _ from 'underscore'

const initState = function () {

  return {
    activepropertylist:{},
    activepropertylists:[],
  };

};

export default function (state = initState(), action = {}) {
  switch (action.type) {
    case Type.ACTIVEPROPERTYLIST_LIST:
      return Object.assign({}, state, {
        activepropertylists: action.data,
      });
    case Type.ACTIVEPROPERTYLIST_GET:
      return Object.assign({}, state, {
        activepropertylist: action.data,
      });
    case Type.ACTIVEPROPERTYLIST_ADD_DO:
      return Object.assign({}, state, {
        activepropertylist: action.data,
      });
    case Type.ACTIVEPROPERTYLIST_ADD:
      return Object.assign({}, state, {
        activepropertylist: action.data,
      });
    case Type.ACTIVEPROPERTYLIST_UPDATE:
    case Type.ACTIVEPROPERTYLIST_UPDATE_DO:
      return Object.assign({}, state, {
        activepropertylist: action.data,
      });
    case Type.SUPPLIERMAP_DELETE:
      return Object.assign({}, state, {
        activepropertylist: action.data,
      });

    case Type.ACTIVEPROPERTYLIST_DELETE:
      var activepropertylists = _.reject(state.activepropertylists, (u)=>{
        return u.id == action.data.id
      })
      return Object.assign({}, state, {
        activepropertylists: activepropertylists
      });

    default:
      return state;
  }
}
