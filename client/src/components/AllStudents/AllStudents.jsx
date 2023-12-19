import React, { useState, useEffect } from "react";

function AllStudents() {

  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    fetch('/api/students')
      .then(r => r.json())
      .then(studentData => setAllStudents(studentData))
  }, [])

  return (
    <div>
      <h1>All Students</h1>
      <ul>
        {allStudents.map((student) => <li key={student.id}>{student.name}</li>)}
      </ul>
    </div>
  )
}

export default AllStudents;