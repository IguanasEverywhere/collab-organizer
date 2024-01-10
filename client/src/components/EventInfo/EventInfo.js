import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';

function EventInfo() {

  const params = useParams();

  const [eventInfo, setEventInfo] = useState(null);

  useEffect(() => {
    fetch(`/api/events/${[params.id]}`)
      .then(r => r.json())
      .then(eventData => setEventInfo(eventData))
  }, [params.id])

  console.log(eventInfo)


  if (eventInfo === null) {
    return <p>Loading...</p>
  }

  return (
    <div>

      <Link to={`/students/${eventInfo.student.id}`}><h2>{eventInfo.student.name}</h2></Link>
      <h3>{eventInfo.event_type}</h3>
      <h5>{eventInfo.location}</h5>
      <h5>{eventInfo.event_length} minutes</h5>
      <h5>Pianist: </h5><Link to="/">{eventInfo.pianist.name}</Link>

    </div>
  )
}

export default EventInfo;