import React from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Pages
import Play from './pages/Play'
import LandingPage from './pages/LandingPage'
import HowToPlay from './pages/HowToPlay'
import LeaderBoard from './pages/LeaderBoard'
import PreparationPage from './pages/PreparationPage'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/howtoplay">
            <HowToPlay />
          </Route>
          <Route path="/leaderboard">
            <LeaderBoard />
          </Route>
          <Route path="/gameplay">
            <Play />
          </Route>
          <Route path="/preparationpage">
            <PreparationPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
