import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import lightStyles from './WelcomeLandingLight.module.css';
import darkStyles from './WelcomeLandingDark.module.css';
import { Link } from 'react-router-dom';

function WelcomeLanding() {

  const viewMode = useSelector(state => state.viewMode.value)

  const [unassignedEvents, setUnassignedEvents] = useState([]);

  useEffect(() => {
    fetch('/api/unassigned-events')
      .then(r => r.json()).then(events => setUnassignedEvents(events))
  }, [])

  const currentStyle = viewMode === "light" ? lightStyles : darkStyles

  return (
    <div className={currentStyle.mainBody}>
      <h1>Welcome!</h1>
      {unassignedEvents.map((event) =>

        <Link
          to={`/events/${event.id}`}
          key={event.id}
          className={currentStyle.listing}>
          {new Date(event.event_time).toLocaleDateString()} | {event.event_type} | {event.student ? event.student.name : "unassigned"} | {event.student ? event.student.instrument : "Unassigned student"}
        </Link>)
      }
    </div>
  )
}

export default WelcomeLanding;