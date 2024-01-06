import React from "react";
import { Switch, Route } from "react-router-dom";
import AllStudents from '../components/AllStudents/AllStudents';
import AllPianists from '../components/AllPianists/AllPianists';
import AllEvents from '../components/AllEvents/AllEvents';
import StudentInfo from '../components/StudentInfo/StudentInfo';
import PianistInfo from '../components/PianistInfo/PianistInfo';
import NavBar from '../components/NavBar/NavBar';


function App() {

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

export default App;
