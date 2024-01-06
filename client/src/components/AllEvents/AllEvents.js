import React from 'react';
import { useSelector } from 'react-redux';

function AllEvents() {

  const viewMode = useSelector(state => state.viewMode)
  const loggedInUser = useSelector(state => state.loggedInUser)

  console.log(viewMode)
  console.log(loggedInUser)
  return (
    <div>
      All Events
      <h3>{viewMode.value}</h3>
      <h1>{loggedInUser.value}</h1>
    </div>
  )
}

export default AllEvents;