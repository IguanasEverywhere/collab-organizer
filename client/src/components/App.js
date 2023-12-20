import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import AllStudents from '../components/AllStudents/AllStudents.jsx';
import AllPianists from '../components/AllPianists/AllPianists.jsx';
import AllEvents from '../components/AllEvents/AllEvents.jsx';
import StudentInfo from '../components/StudentInfo/StudentInfo.jsx';

function App() {
  return (
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
    </Switch>
  );
}

export default App;
