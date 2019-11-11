import * as Type from '../actions/types.js';
import _ from 'underscore'

const initState = function () {

  return {
    suppliermap:{},
    suppliermaps:[],
  };

};

export default function (state = initState(), action = {}) {
  switch (action.type) {
    case Type.SUPPLIERMAP_LIST:
      return Object.assign({}, state, {
        suppliermaps: action.data,
      });
    case Type.SUPPLIERMAP_GET:
      return Object.assign({}, state, {
        suppliermap: action.data,
      });
    case Type.SUPPLIERMAP_ADD_DO:
      return Object.assign({}, state, {
        suppliermap: action.data,
      });
    case Type.SUPPLIERMAP_ADD:
      return Object.assign({}, state, {
        suppliermap: action.data,
      });
    case Type.SUPPLIERMAP_UPDATE:
    case Type.SUPPLIERMAP_UPDATE_DO:
      return Object.assign({}, state, {
        suppliermap: action.data,
      });
    case Type.SUPPLIERMAP_DELETE:
      var suppliermaps = _.reject(state.suppliermaps, (u)=>{
        return u.id == action.data.id
      })
      return Object.assign({}, state, {
        suppliermaps: suppliermaps
      });

    default:
      return state;
  }
}
