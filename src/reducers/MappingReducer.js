import * as Type from '../actions/types.js';
import _ from 'underscore'

const initState = function () {

  return {
    mappingData:{},
    mappings:[],
  };

}

export default function (state = initState(), action = {}) {
  switch (action.type) {
    case Type.GET_MAPPING:
      return Object.assign({}, state, {
        mappingData: action.data,
      });
    case Type.MAPPING_LIST:
    return Object.assign({}, state, {
      mappings: action.data,
    });
    case Type.SAVE_MAPPING:
      var mapping = _.find(state.mappings, (u)=>{
        return u.providerId == action.data.providerId && u.clarifiId == action.data.clarifiId 
      })
      console.log('mapping', mapping)
      if(mapping) {
        _.extend(mapping, action.data)
      } else {
        state.mappings.push(action.data)
      }
      return Object.assign({}, state, {
        mappingData: action.data,
        mappings:state.mappings
      });
    case Type.MAPPING_DELETE:
      var mappings = _.reject(state.mappings, (u)=>{
        return u.providerId == action.data.providerId && u.clarifiId == action.data.clarifiId 
      })
      return Object.assign({}, state, {
        mappings: mappings
      });

    default:
      return state;
  }
}
