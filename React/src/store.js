/**
 * Create the store with asynchronously loaded reducers
 */

import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reduxPromiseMiddleware from 'redux-promise-middleware'
import createLogger from 'redux-logger'
import { fromJS } from 'immutable'
import { routerMiddleware } from 'react-router-redux'
import createReducer from './reducers'

const devtools = window.devToolsExtension || (() => noop => noop)

let cachedStore = {}

const configureStore = (initialState = {}, history) => {
  const middlewares = [
    thunkMiddleware,
    createLogger(),
    routerMiddleware(history),
    reduxPromiseMiddleware(),
  ]
  const enhancers = [applyMiddleware(...middlewares), devtools()]
  const store = createStore(
    createReducer({}),
    fromJS(initialState),
    compose(...enhancers)
  )

  // Make reducers hot reloadable, see http://mxs.is/googmo
  if (module.hot) {
    const nextReducers = createReducer(store.asyncReducers)

    store.replaceReducer(nextReducers)
  }
  // Initialize it with no other reducers
  store.asyncReducers = {}

  cachedStore = store

  return store
}

const injectAsyncReducer = (name, asyncReducer) => {
  cachedStore.asyncReducers[name] = asyncReducer
  cachedStore.replaceReducer(createReducer(cachedStore.asyncReducers))
}

/**
 * @param reducers - {reducerName: () => System.import('reducer path'))}
 * @see https://github.com/ZhuGongpu/CodeSnippets/issues/86
 */
export const injectReducers = reducers =>
  Promise.all(
    Object.keys(reducers).map(name =>
      reducers[name]().then(reducer =>
        injectAsyncReducer(name, reducer.default || reducer)
      )
    )
  )

export default configureStore
