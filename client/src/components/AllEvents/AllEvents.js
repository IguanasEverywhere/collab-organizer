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

  return (
    <div className={currentStyle.mainBody}>
      <h1>All Events for Coordinator: {loggedInUser.value.payload.username}</h1>

      <div className={currentStyle.eventsListing}>
          {allEvents.map((event) => <div key={event.id} className={currentStyle.listing}>{event.event_time} | {event.event_type} | {event.student.name} | {event.student.instrument}</div>)}
      </div>
    </div>
  )
}

export default AllEvents;