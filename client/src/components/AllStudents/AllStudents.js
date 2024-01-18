import React, { useState, useEffect } from "react";
import {useSelector} from 'react-redux';
import lightStyles from './AllStudentsLight.module.css';
import darkStyles from './AllStudentsDark.module.css';
import {Link} from 'react-router-dom';
import NewStudentModal from './NewStudentModal/NewStudentModal';

function AllStudents() {

  const [allStudents, setAllStudents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);


  const viewMode = useSelector(state => state.viewMode.value)
  const coordinator = useSelector(state => state.loggedInUser.value)

  useEffect(() => {
    fetch('/api/students')
      .then(r => r.json())
      .then(studentData => setAllStudents(studentData))
  }, [])

  const currentStyle = viewMode === "light" ? lightStyles : darkStyles

  const handleAddNewClick = () => {
    setModalVisible((prevVis) => !prevVis)
  }

  return (
    <div className={currentStyle.mainBody}>
      {modalVisible ? <NewStudentModal setModalVisible={setModalVisible}/> : null}
      <h1>All Students for coordinator: {coordinator.payload.username}</h1>
      <div className={currentStyle.studentsListingArea}>
        <button onClick={handleAddNewClick} className={currentStyle.addNewBtn}>Add New Student</button>
        {allStudents.map((student) => <Link to={`/students/${student.id}`}
        key={student.id}
        className={currentStyle.studentListing}
        >{student.name}</Link>)}
        </div>
    </div>
  )
}

export default AllStudents;