import * as Type from '../actions/types.js';
import _ from 'underscore'
const userKey = 'user';

const initState = function () {

  var userInfo = {};

  if (localStorage.getItem(userKey)) {
    userInfo = JSON.parse(localStorage.getItem(userKey));
  }

  return {
    userInfo: userInfo,
    user:{},
    users:[]
  };

}

export default function (state = initState(), action = {}) {
  switch (action.type) {
    case Type.USER_INFO_SET:
      return Object.assign({}, state, {
        userInfo: action.payload,
      });
    case Type.USER_LIST:
      return Object.assign({}, state, {
        users: action.data,
      });
    case Type.USER_GET:
      return Object.assign({}, state, {
        user: action.data,
      });
    case Type.USER_ADD:
      state.users.push(action.data)
      return state
    case Type.USER_UPDATE:
      return Object.assign({}, state, {
        user: action.data,
      });
    case Type.USER_DELETE:
      var users = _.reject(state.users, (u)=>{
        return u.id == action.data.id
      })
      return Object.assign({}, state, {
        users: users
      });

    default:
      return state;
  }
}
