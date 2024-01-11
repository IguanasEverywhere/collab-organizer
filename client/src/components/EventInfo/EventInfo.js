import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import lightStyles from './EventInfoLight.module.css';
import EventModal from '../EventModal/EventModal';

function EventInfo() {

  const params = useParams();

  const [eventInfo, setEventInfo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch(`/api/events/${[params.id]}`)
      .then(r => r.json())
      .then(eventData => setEventInfo(eventData))
  }, [params.id])

  console.log(eventInfo)

  const handleEditClick =() => {
    setModalVisible((modalVisible) => !modalVisible)
  }




  if (eventInfo === null) {
    return <p>Loading...</p>
  }

  return (

    <div className={lightStyles.mainBody}>
      {modalVisible ? <EventModal setModalVisible={setModalVisible} /> : null}
      <div className={lightStyles.eventInfo}>
        <h2>Student: <Link to={`/students/${eventInfo.student_id}`}>{eventInfo.student.name}</Link></h2>
        <h3>{eventInfo.event_type}</h3>
        <h5>{eventInfo.location}</h5>
        <h5>{eventInfo.event_length} minutes</h5>
        <h5>Pianist: </h5><Link to={`/pianists/${eventInfo.pianist_id}`}>{eventInfo.pianist.name}</Link>
        <div className={lightStyles.buttonsArea}>
          <button onClick={handleEditClick}>Edit Event</button>
          <button>Delete Event</button>
        </div>

      </div>
    </div>
  )
}

export default EventInfo;