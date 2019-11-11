import * as Type from '../actions/types.js';
import _ from 'underscore'

const initState = function () {

  return {
    reports:[],
    report:null
  };

}

export default function (state = initState(), action = {}) {
  switch (action.type) {
    case Type.REPORT_LIST:
      return Object.assign({}, state, {
        reports: action.data,
      });
    case Type.REPORT_ADD:
      return Object.assign({}, state, {
        report: action.data,
      });

    default:
      return state;
  }
}
