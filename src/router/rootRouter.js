import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// import Home from '../screens/Home/Home'
import Login from '../screens/Login/Login'
import Training from '../screens/Training/Training'
import Schedule from '../screens/Schedule/Schedule'
import SignUp from '../screens/SignUp/SignUp';
import CreateTraining from '../screens/CreateTraining/CreateTraining';
import MemberList from '../screens/MemberList/MemberList';
import TrainingDetails from '../screens/TrainingDetails/TrainingDetails';

export const useRoutes = isAuthenticated => {
  return (
    <Router>
      {isAuthenticated ? (
      <Switch>
        {/* <Route path="/" exact>
          <Home />
        </Route> */}
        <Route path="/members" exact>
          <MemberList />
        </Route>
        <Route path="/training" exact>
          <Training />
        </Route>
        <Route path="/schedule" exact>
          <Schedule />
        </Route>
        <Route path="/create" exact>
          <CreateTraining />
        </Route>
        <Route path="/training/:id">
          <TrainingDetails />
        </Route>
        <Redirect to="/training" />
      </Switch>
    ) : (
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>   
        <Route path="/signup" exact>
          <SignUp />
        </Route> 
        <Redirect to="/login" />
      </Switch>
    )}
  </Router>
  )
}