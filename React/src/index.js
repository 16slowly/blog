import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'app/store'
import Routes, { history } from 'app/routes'
import 'normalize.css'
import 'styles/reset.scss'
import 'styles/global.scss'

// Create redux store with history
const initialState = {}
const store = configureStore(initialState, history)
// @see https://github.com/vivedu/VIVEDU-Homepage/issues/192
const buildVersion = process.env.BUILD_VERSION

if (buildVersion) {
  // eslint-disable-next-line no-console
  console.log(`current build: ${buildVersion}`)
}

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
)
