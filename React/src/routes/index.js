/**
 * @see https://github.com/vivedu/VIVEDU-Store/issues/157
 */

import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { createBrowserHistory } from 'history'
import App from 'components/App'

export const history = createBrowserHistory()

const Routes = () => (
  // ConnectedRouter will use the store from Provider automatically
  <ConnectedRouter history={history}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </ConnectedRouter>
)

export default Routes
