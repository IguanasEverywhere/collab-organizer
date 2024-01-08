import React from 'react';
import { useSelector } from 'react-redux';

function AllEvents() {

  const viewMode = useSelector(state => state.viewMode)
  const loggedInUser = useSelector(state => state.loggedInUser)

  return (
    <div>
      All Events
      <h3>VIEW MODE: {viewMode.value}</h3>
      <h1>USERNAME: {loggedInUser.value.payload.username}</h1>
    </div>
  )
}

export default AllEvents;