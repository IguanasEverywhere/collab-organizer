import React, { useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import AllStudents from '../components/AllStudents/AllStudents';
import AllPianists from '../components/AllPianists/AllPianists';
import AllEvents from '../components/AllEvents/AllEvents';
import StudentInfo from '../components/StudentInfo/StudentInfo';
import PianistInfo from '../components/PianistInfo/PianistInfo';
import NavBar from '../components/NavBar/NavBar';
import Login from '../components/Login/Login';
import WelcomeLanding from '../components/WelcomeLanding/WelcomeLanding';

import { useSelector, useDispatch } from 'react-redux';
import { changeLoggedInUser } from '../reduxSlices/loggedInUserSlice';




function App() {

  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.loggedInUser.value)

  const location = useLocation();


  useEffect(() => {
    fetch('/api/check-session')
      .then(r => r.json())
      .then(loggedInData => {
        dispatch(changeLoggedInUser(loggedInData))
      })
  }, [dispatch])

  let redirectPath = location.pathname === '/' ? '/welcome' : location.pathname

  if (!loggedInUser.payload) {
    return (
      <>
        <Switch>
          <Route exact to='/login'>
            <Login />
          </Route>
        </Switch>
      </>
    )
  }

  else {

    return (
      <>
        <Redirect to={redirectPath} />
        <NavBar />
        <Switch>
          <Route exact path='/welcome'>
            <WelcomeLanding />
          </Route>
          <Route exact path='/students'>
            <AllStudents />
          </Route>
          <Route exact path='/pianists'>
            <AllPianists />
          </Route>
          <Route exact path='/events'>
            <AllEvents />
          </Route>
          <Route exact path='/students/:id'>
            <StudentInfo />
          </Route>
          <Route exact path='/pianists/:id'>
            <PianistInfo />
          </Route>
        </Switch>
      </>
    );
  }
}

export default App;
