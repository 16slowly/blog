import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from 'pages/HomePage'

const App = ({ location, history }) => (
  <div>
    <Switch>
      <Route exact path="/" component={HomePage} />
      {/* TODO: append other pages route */}
    </Switch>
  </div>
)

export default App
