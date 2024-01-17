import React, { useState, useEffect } from "react";
import {useSelector} from 'react-redux';
import lightStyles from './AllStudentsLight.module.css';
import darkStyles from './AllStudentsDark.module.css';
import {Link} from 'react-router-dom';

function AllStudents() {

  const [allStudents, setAllStudents] = useState([]);
  const viewMode = useSelector(state => state.viewMode.value)
  const coordinator = useSelector(state => state.loggedInUser.value)

  useEffect(() => {
    fetch('/api/students')
      .then(r => r.json())
      .then(studentData => setAllStudents(studentData))
  }, [])

  const currentStyle = viewMode === "light" ? lightStyles : darkStyles

  return (
    <div className={currentStyle.mainBody}>
      <h1>All Students for coordinator: {coordinator.payload.username}</h1>
      <div className={currentStyle.studentsListingArea}>
        <button className={currentStyle.addNewBtn}>Add New Student</button>
        {allStudents.map((student) => <Link to={`/students/${student.id}`}
        key={student.id}
        className={currentStyle.studentListing}
        >{student.name}</Link>)}
        </div>
    </div>
  )
}

export default AllStudents;