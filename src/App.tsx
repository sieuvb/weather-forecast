import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { CityDetail, CityList } from "features"
import { i18n } from "core"

i18n.init()

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:id">
          <CityDetail />
        </Route>
        <Route path="/" exact>
          <CityList />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
