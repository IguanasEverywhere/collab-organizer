import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import lightStyles from './EventInfoLight.module.css';
import darkStyles from './EventInfoDark.module.css';
import EditEventModal from '../EditEventModal/EditEventModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';

import { useSelector } from 'react-redux';


function EventInfo() {

  const params = useParams();

  const [eventInfo, setEventInfo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const viewMode = useSelector(state => state.viewMode.value)
  const currentStyle = viewMode === "light" ? lightStyles : darkStyles

  useEffect(() => {
    fetch(`/api/events/${[params.id]}`)
      .then(r => r.json())
      .then(eventData => setEventInfo(eventData))
  }, [params.id])

  const handleEditClick = () => {
    setModalVisible((modalVisible) => !modalVisible)
  }

  const handleDeleteClick = () => {
    setDeleteModalVisible((deleteModalVisible) => !deleteModalVisible)
  }


  if (eventInfo === null) {
    return <p>Loading...</p>
  }

  console.log(eventInfo)

  return (

    <div className={currentStyle.mainBody}>

      {deleteModalVisible ? <ConfirmDeleteModal setDeleteModalVisible={setDeleteModalVisible} /> : null}

      {modalVisible ? <EditEventModal setModalVisible={setModalVisible} eventInfo={eventInfo} /> : null}

      <div className={lightStyles.eventInfo}>
        <h2>Student: <Link to={`/students/${eventInfo.student_id}`}>{eventInfo.student.name}</Link></h2>
        <h3>{eventInfo.event_type}</h3>
        <h5>{new Date(eventInfo.event_time).toLocaleString()}</h5>
        <h5>{eventInfo.location}</h5>
        <h5>{eventInfo.event_length} minutes</h5>
        <h5>Pianist: </h5><Link to={`/pianists/${eventInfo.pianist_id}`}>{eventInfo.pianist.name}</Link>
        <div className={lightStyles.buttonsArea}>
          <button onClick={handleEditClick}>Edit Event</button>
          <button onClick={handleDeleteClick}>Delete This Event</button>
        </div>

      </div>
    </div>
  )
}

export default EventInfo;