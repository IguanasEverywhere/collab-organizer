import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import lightStyles from './AllEventsLight.module.css';
import darkStyles from './AllEventsDark.module.css';

function AllEvents() {

  const viewMode = useSelector(state => state.viewMode.value)
  const loggedInUser = useSelector(state => state.loggedInUser)

  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {

    fetch('/api/events')
      .then(r => r.json())
      .then(eventsData => setAllEvents(eventsData))
  }, [])

  const currentStyle = viewMode === "light" ? lightStyles : darkStyles

  console.log(allEvents)


  return (
    <div className={currentStyle.mainBody}>
      <h1>All Events for Coordinator: {loggedInUser.value.payload.username}</h1>

      <ul>
        {allEvents.map((event) => <li key={event.id}>{event.event_type} | {event.event_time} | {event.student.name} | {event.student.instrument}</li>)}
      </ul>
    </div>
  )
}

export default AllEvents;