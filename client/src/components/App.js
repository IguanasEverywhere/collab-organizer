import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AllStudents from '../components/AllStudents/AllStudents';
import AllPianists from '../components/AllPianists/AllPianists';
import AllEvents from '../components/AllEvents/AllEvents';
import StudentInfo from '../components/StudentInfo/StudentInfo';
import PianistInfo from '../components/PianistInfo/PianistInfo';
import NavBar from '../components/NavBar/NavBar';
import Login from '../components/Login/Login';

import { useSelector, useDispatch } from 'react-redux';
import { changeLoggedInUser } from '../reduxSlices/loggedInUserSlice';

// do useEffect here to get current user session, dispatch to the loggedin user state what comes back


function App() {

  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.loggedInUser.value)

  useEffect(() => {
    fetch('/api/check-session')
      .then(r => r.json())
      .then(loggedInData => {
        dispatch(changeLoggedInUser(loggedInData))
      })
  }, [dispatch])

  console.log("LOGGED IN USER", loggedInUser)


  if (!loggedInUser.payload) {
    return (
      <>
        {/* may need to do a redirect here for URL */}
        <Login />
      </>
    )
  }

  else {
    //console.log("here's the else")
    return (
      <>
        <NavBar />
        <Switch>
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
