import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

  console.log(studentInfo)

  let eventsInfo =
    studentInfo.events.length > 0 ?
      studentInfo.events.map((studentEvent) => <li key={studentEvent.id}>
        {studentEvent.event_type} | {studentEvent.event_time} | {studentEvent.location} | {studentEvent.event_length} minutes | Pianist: {studentEvent.pianist.name}
      </li>) :
      <p>No events</p>


  return (
    <div>
      <h1>
        {studentInfo.name}
      </h1>
      <p>
        {studentInfo.instrument}
      </p>
      <p>
        {studentInfo.email}
      </p>
      <p>
        {studentInfo.teacher}
      </p>
      <ul>
        {eventsInfo}
      </ul>
    </div>
  )
}

export default StudentInfo;