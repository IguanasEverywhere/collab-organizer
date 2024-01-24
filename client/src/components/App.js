import React, { useEffect } from "react";
import { Switch, Route, Redirect, useLocation, useHistory } from "react-router-dom";
import AllStudents from '../components/AllStudents/AllStudents';
import AllPianists from '../components/AllPianists/AllPianists';
import AllEvents from '../components/AllEvents/AllEvents';
import StudentInfo from '../components/StudentInfo/StudentInfo';
import PianistInfo from '../components/PianistInfo/PianistInfo';
import NavBar from '../components/NavBar/NavBar';
import WelcomeLanding from '../components/WelcomeLanding/WelcomeLanding';
import EventInfo from '../components/EventInfo/EventInfo';
import LandingPage from '../components/LandingPage/LandingPage';
import SignUp from '../components/SignUp/SignUp';
import NewEvent from '../components/AllEvents/NewEvent/NewEvent';

import { useSelector, useDispatch } from 'react-redux';
import { changeLoggedInUser } from '../reduxSlices/loggedInUserSlice';
import { changeView } from '../reduxSlices/darkModeSlice';

import styles from './App.module.css';


function App() {

  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.loggedInUser.value)
  const history = useHistory();

  const location = useLocation();

  useEffect(() => {
    fetch('/api/check-session')
      .then(r => {
        return r.json()
      })
      .then(loggedInData => {
        if (!loggedInData && location.pathname !== '/signup') {
          history.push('/')
        }
        dispatch(changeLoggedInUser(loggedInData));
      })
  }, [dispatch, history, location.pathname])



  let redirectPath = location.pathname === '/' ? '/welcome' : location.pathname


  useEffect(() => {
    if (!loggedInUser.payload) {
      dispatch(changeView('light'))
    } else {
      dispatch(changeView(loggedInUser.payload.viewModePreference))
    }
  }, [dispatch, loggedInUser.payload])


  if (!loggedInUser.payload) {

    return (
      <>
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/signup'>
            <SignUp />
          </Route>
        </Switch>
      </>
    )
  }

  else {
    return (

      <div className={styles.mainBody}>
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
          <Route exact path='/events/:id'>
            <EventInfo />
          </Route>
          <Route exact path='/new-event'>
            <NewEvent />
          </Route>
          <Route exact path='/students/:id'>
            <StudentInfo />
          </Route>
          <Route exact path='/pianists/:id'>
            <PianistInfo />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
