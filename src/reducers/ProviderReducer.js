import * as Type from '../actions/types.js';
import _ from 'underscore'

const initState = function () {

  return {
    provider:{},
    providers:[],
  };

};

export default function (state = initState(), action = {}) {
  switch (action.type) {
    case Type.PROVIDER_LIST:
      return Object.assign({}, state, {
        providers: action.data,
      });
    case Type.PROVIDER_GET:
      return Object.assign({}, state, {
        provider: action.data,
      });
    case Type.PROVIDER_ADD_DO:
      return Object.assign({}, state, {
        provider: action.data,
      });
    case Type.PROVIDER_ADD:
      return Object.assign({}, state, {
        provider: action.data,
      });
    case Type.PROVIDER_UPDATE:
    case Type.PROVIDER_UPDATE_DO:
      return Object.assign({}, state, {
        provider: action.data,
      });
    case Type.PROVIDER_DELETE:
      var providers = _.reject(state.providers, (u)=>{
        return u.id == action.data.id
      })
      return Object.assign({}, state, {
        providers: providers
      });

    default:
      return state;
  }
}
