import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import lightStyles from './PianistInfoLight.module.css';
import darkStyles from './PianistInfoDark.module.css';
import { Link } from 'react-router-dom';

function PianistInfo() {

  let pianistID = useParams();
  let history = useHistory();

  const viewMode = useSelector(state => state.viewMode.value)
  const currentStyle = viewMode === "light" ? lightStyles : darkStyles

  const [pianistInfo, setPianistInfo] = useState({
    name: null,
    email: null,
    role: null,
    events: [],
  });

  useEffect(() => {
    fetch(`/api/pianists/${pianistID.id}`)
      .then(r => r.json())
      .then(pianistData => {
        setPianistInfo({
          name: pianistData.name,
          email: pianistData.email,
          role: pianistData.role,
          events: pianistData.events,
        })
      })

  }, [pianistID.id])


  let pianistEvents = pianistInfo.events.length > 0 ? pianistInfo.events.map((event) =>
    <div
      className={currentStyle.eventListing}
      key={event.id}
    >
      <Link to={`/events/${event.id}`}
      >{event.student.name} | {event.event_type}
      </Link>
    </div>)
    : <p>No Events</p>

    const handleDeleteClick = () => {
      fetch(`/api/pianists/${pianistID.id}`, {
        method: 'DELETE',
      }).then(r => r.json()).then(confirmation => history.push('/pianists'))
    }


  return (
    <div className={currentStyle.mainBody}>
      <div className={currentStyle.pianistInfoLayout}>
        <div className={currentStyle.pianistInfo}>
          <h2>Pianist: {pianistInfo.name}</h2>
          <p>{pianistInfo.email}</p>
          <p>{pianistInfo.role}</p>
          <button onClick={handleDeleteClick}>Delete pianist: {pianistInfo.name}</button>
        </div>

        <div className={currentStyle.pianistEventsInfo}>
          <h3>Events scheduled for {pianistInfo.name}</h3>
          {pianistEvents}
        </div>
      </div>
    </div>
  )
}

export default PianistInfo;

