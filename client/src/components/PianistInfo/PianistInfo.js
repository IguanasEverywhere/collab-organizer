import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PianistInfo() {

  let pianistID = useParams();

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

  // update this to include more info
  let pianistEvents = pianistInfo.events.length > 0 ? pianistInfo.events.map((event) => <li key={event.id}>{event.student.name} | {event.event_type}</li>) : <p>No Events</p>

  return (
    <div>
      <p>{pianistInfo.name}</p>
      <p>{pianistInfo.email}</p>
      <p>{pianistInfo.role}</p>
      <ul>
        {pianistEvents}
      </ul>
    </div>
  )
}

export default PianistInfo;