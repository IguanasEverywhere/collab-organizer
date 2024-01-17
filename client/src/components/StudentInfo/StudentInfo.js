import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import lightStyles from './StudentInfoLight.module.css';
import darkStyles from './StudentInfoDark.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';


function StudentInfo() {

  const studentID = useParams();
  const history = useHistory();

  const viewMode = useSelector((state) => state.viewMode.value)

  const currentStyle = viewMode === "light" ? lightStyles : darkStyles

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
        className={currentStyle.eventListing}>
        <Link
          to={`/events/${studentEvent.id}`}
        >
          <h4>{studentEvent.event_type}</h4>
          <p>{studentEvent.event_time} | {studentEvent.location}</p>
          <p>{studentEvent.event_length} minutes</p>
          <h5>Pianist: {studentEvent.pianist.name}</h5>
        </Link></div>) :
      <p>No events</p>


      const handleDelete = () => {
        fetch(`/api/students/${studentID.id}`, {
          method:'DELETE'
        }).then(r =>r.json()).then(confirmation => {
          console.log(confirmation)
          history.push('/students')
        })
      }



  return (
    <div className={currentStyle.mainBody}>
      <div className={currentStyle.studentInfoPageLayout}>
        <div className={currentStyle.studentInfo}>
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
          <button onClick={handleDelete} className={currentStyle.deleteBtn}>{`Delete ${studentInfo.name} and their events`}</button>
        </div>
        <div className={currentStyle.eventsInfo}>
          <h3>Events For {studentInfo.name}</h3>
          {eventsInfo}
        </div>
      </div>
    </div>
  )
}

export default StudentInfo;