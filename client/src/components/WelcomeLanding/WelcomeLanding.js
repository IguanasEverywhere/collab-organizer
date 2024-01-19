import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import lightStyles from './WelcomeLandingLight.module.css';
import darkStyles from './WelcomeLandingDark.module.css';
import EventListing from '../AllEvents/EventListing/EventListing';

function WelcomeLanding() {

  const viewMode = useSelector(state => state.viewMode.value)
  const loggedInUser = useSelector(state => state.loggedInUser.value)

  const [unassignedEvents, setUnassignedEvents] = useState([]);

  useEffect(() => {
    fetch('/api/unassigned-events')
      .then(r => r.json()).then(events => setUnassignedEvents(events))
  }, [])

  const currentStyle = viewMode === "light" ? lightStyles : darkStyles

  return (
    <div className={currentStyle.mainBody}>
      <div className={currentStyle.mainBodyLeft}>
        <h1>Welcome, {loggedInUser.payload.username}!</h1>
        <h3>Let's organize your pianist assignments for {loggedInUser.payload.organization}</h3>
      </div>
      <div className={currentStyle.mainBodyRight}>
        <h2>To-DO:</h2>
        {unassignedEvents.length > 0 ? <h3>The following events do not have a pianist assigned yet:</h3> : <h3>🎉 You're all caught up! All your events have a pianist assignment!</h3>}
        <div className={currentStyle.listingArea}>
          {unassignedEvents.map((event) =>
            <EventListing key={event.id} event={event} />)
          }
        </div>
      </div>
    </div>
  )
}

export default WelcomeLanding;