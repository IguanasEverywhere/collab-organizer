import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function AllEvents() {

  const viewMode = useSelector(state => state.viewMode)
  const loggedInUser = useSelector(state => state.loggedInUser)

  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then(r => r.json())
      .then(eventsData => setAllEvents(eventsData))
  })



  return (
    <div>
      All Events
      <h3>VIEW MODE: {viewMode.value}</h3>
      <h1>USERNAME: {loggedInUser.value.payload.username}</h1>

      <ul>
        {allEvents.map((event) => <li key={event.id}>{event.event_type} | {event.student_id} | {event.location}</li>)}
      </ul>
    </div>
  )
}

export default AllEvents;