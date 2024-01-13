import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './StudentInfo.module.css';
import { Link } from 'react-router-dom';

function StudentInfo() {

  const studentID = useParams();

  const [studentInfo, setStudentInfo] = useState({
    name: null,
    instrument: null,
    email: null,
    teacher: null,
    events: []
  })

  useEffect(() => {
    fetch(`/api/students/${studentID.id}`)
      .then(r => r.json())
      .then(studentData => setStudentInfo({
        name: studentData.name,
        instrument: studentData.instrument,
        email: studentData.email,
        teacher: studentData.teacher,
        events: studentData.events
      }))
  }, [studentID.id])


  let eventsInfo =
    studentInfo.events.length > 0 ?
      studentInfo.events.map((studentEvent) => <div
        key={studentEvent.id}
        className={styles.eventListing}>
        <Link
          to={`/events/${studentEvent.id}`}
        >
          <h4>{studentEvent.event_type}</h4>
          <p>{studentEvent.event_time} | {studentEvent.location}</p>
          <p>{studentEvent.event_length} minutes</p>
          <h5>Pianist: {studentEvent.pianist.name}</h5>
        </Link></div>) :
      <p>No events</p>


  return (
    <div className={styles.studentInfoPageLayout}>
      <div className={styles.studentInfo}>
        <h1>
          {studentInfo.name}
        </h1>
        <p>
          Instrument: {studentInfo.instrument}
        </p>
        <p>
          Email: {studentInfo.email}
        </p>
        <p>
          Teacher: {studentInfo.teacher}
        </p>
      </div>
      <div className={styles.eventsInfo}>
        <h3>Events For {studentInfo.name}</h3>
        {/* <ul> */}
        {eventsInfo}
        {/* </ul> */}
      </div>
    </div >
  )
}

export default StudentInfo;