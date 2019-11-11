import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import promise from "redux-promise-middleware"
import reducers from './reducers/reducers.js';
const store = createStore(reducers, applyMiddleware(promise(), thunk, createLogger()));

export default store;
