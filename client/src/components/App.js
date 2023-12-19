import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import AllStudents from '../components/AllStudents/AllStudents.jsx';
import AllPianists from '../components/AllPianists/AllPianists.jsx';
import AllEvents from '../components/AllEvents/AllEvents.jsx';

function App() {
  return (
    <Switch>
      <Route path='/students'>
        <AllStudents />
      </Route>
      <Route path='/pianists'>
        <AllPianists />
      </Route>
      <Route path='/events'>
        <AllEvents />
      </Route>
    </Switch>
  );
}

export default App;
