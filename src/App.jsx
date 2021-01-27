import React, { useState } from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//Pages
import Play from './pages/Play'
import LandingPage from './pages/LandingPage'
import HowToPlay from './pages/HowToPlay'
import LeaderBoard from './pages/LeaderBoard'
import PreparationPage from './pages/PreparationPage'
import PrivateRoute from './pages/PrivateRoute'
import NotFound from './pages/notFound'
import ResultPage from './pages/ResultPage'
import { AuthContext } from './context/auth'


function App() {
  const [authTokens, setAuthTokens] = useState(false);
  
  const setTokens = (data) => {
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
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
          <PrivateRoute path="/gameplay" component={Play} />
          <PrivateRoute path="/result" component={ResultPage} />
          <Route path="/preparation">
            <PreparationPage />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
