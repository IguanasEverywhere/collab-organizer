import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import lightStyles from './WelcomeLandingLight.module.css';
import darkStyles from './WelcomeLandingDark.module.css';
import { Link } from 'react-router-dom';
import EventListing from '../AllEvents/EventListing/EventListing';

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
        <EventListing key={event.id} event={event}/>)
      }
    </div>
  )
}

export default WelcomeLanding;