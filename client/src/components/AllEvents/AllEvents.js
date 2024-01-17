import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import lightStyles from './AllEventsLight.module.css';
import darkStyles from './AllEventsDark.module.css';
import { Link } from 'react-router-dom';

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

      <Link to='/new-event'><button className={currentStyle.addNewBtn}>Add New Event</button></Link>



      <div className={currentStyle.eventsListing}>
        {allEvents.map((event) =>
          <Link
            to={`/events/${event.id}`}
            key={event.id}
            className={currentStyle.listing}>
            {new Date(event.event_time).toLocaleDateString()} | {event.event_type} | {event.student.name} | {event.student.instrument}
          </Link>)}
      </div>
    </div>
  )

}

export default AllEvents;