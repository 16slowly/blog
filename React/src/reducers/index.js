/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */
import { combineReducers } from 'redux-immutable'
import routing from './routing'
import list from './list'

// Creates the main reducer with the asynchronously loaded ones
const createReducer = asyncReducers =>
  combineReducers({
    routing,
    list,
    ...asyncReducers,
  })

export default createReducer
