import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from 'pages/HomePage'
import ListPage from 'pages/ListPage'
import CarouselPage from 'pages/CarouselPage'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/list" component={ListPage} />
      <Route exact path="/carousel" component={CarouselPage} />
      {/* TODO: append other pages route */}
    </Switch>
  </div>
)

export default App
