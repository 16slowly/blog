import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from 'pages/HomePage'
import ListPage from 'pages/ListPage'

const App = ({ location, history }) => (
  <div>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/list" component={ListPage} />
      {/* TODO: append other pages route */}
    </Switch>
  </div>
)

export default App
