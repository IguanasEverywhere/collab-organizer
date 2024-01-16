import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import lightStyles from './NewEventLight.module.css';

function NewEvent({ setModalVisible }) {

  const [availablePianists, setAvailablePianists] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);

  useEffect(() => {
    fetch('/api/pianists')
      .then(r => r.json())
      .then(pianists => setAvailablePianists(pianists))
  }, [])

  useEffect(() => {
    fetch('/api/students')
      .then(r => r.json())
      .then(students => setAvailableStudents(students))
  }, [])


  function handleClose() {
    setModalVisible((modalVisible) => !modalVisible)
  }

  const schema = yup.object().shape({
    studentId: yup.number(),
    eventType: yup.string(),
    eventLength: yup.number(),
    eventLocation: yup.string().required(),
    pianistId: yup.number(),
    eventTime: yup.date(),
  })

  const starterDate = new Date();
  const defaultYear = starterDate.getFullYear();
  const defaultMonthNum = starterDate.getMonth() + 1;
  const defaultMonth = defaultMonthNum < 10 ? '0' + defaultMonthNum : defaultMonthNum
  const defaultDay = starterDate.getDate()


  const formik = useFormik({
    initialValues: {
      eventType: "Junior Recital",
      eventLength: 30,
      eventLocation: "",
      pianistId: 1,
      eventTime: `${defaultYear}-${defaultMonth}-${defaultDay}T12:00`,
      studentId: 1,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      }).then(r => r.json()).then(confirmation => {
        //this causes refresh
        // history.go(0);
      })
    }
  })

  console.log(formik.values)


  // add errors to form
  return (
    <>
      {availablePianists.length === 0 || availableStudents === 0 ? <p>You need at least one pianist and one student to create an event!</p> :
        <div className={lightStyles.modalBody}>
          <form onSubmit={formik.handleSubmit}>

            <label htmlFor="student">Student</label>
            <br />
            <select
              id="studentId"
              name="studentId"
              onChange={formik.handleChange}
              value={formik.values.studentId}>
              {availableStudents.map((student) =>
                <option
                  value={student.id}
                  key={student.id}>
                  {`${student.name} | ${student.instrument}`}
                </option>)}
            </select>
            <br />
            <br />

            <label htmlFor="eventType">Event Type</label>
            <br />
            <select
              id="eventType"
              name="eventType"
              onChange={formik.handleChange}
              value={formik.values.eventType}>
              <option value="Junior Recital">Junior Recital</option>
              <option value="Senior Recital">Senior Recital</option>
              <option value="Masterclass">Masterclass</option>
              <option value="Jury">Jury</option>
            </select>
            <br />
            <br />

            <label htmlFor="eventLength">Event Length</label>
            <br />
            <select
              id="eventLength"
              name="eventLength"
              onChange={formik.handleChange}
              value={formik.values.eventLength}>
              <option value="30">30</option>
              <option value="45">45</option>
              <option value="60">60</option>
              <option value="90">90</option>
            </select>
            <br />
            <br />

            <label htmlFor="eventLocation">Event Location</label>
            <br />
            <input
              id="eventLocation"
              name="eventLocation"
              onChange={formik.handleChange}
              value={formik.values.eventLocation}></input>
            <br />
            <small>{formik.errors.eventLocation}</small>
            <br />

            <label htmlFor="eventTime">Event Time</label>
            <br />
            <input
              id="eventTime"
              name="eventTime"
              type="datetime-local"
              onChange={formik.handleChange}
              value={formik.values.eventTime}
            >
            </input>
            <br />
            <br />

            <label htmlFor="pianist">Pianist</label>
            <br />
            <select
              id="pianistId"
              name="pianistId"
              onChange={formik.handleChange}
              value={formik.values.pianistId}>
              {availablePianists.map((pianist) =>
                <option
                  value={pianist.id}
                  key={pianist.id}>
                  {`${pianist.name} | ${pianist.role}`}
                </option>)}
            </select>
            <br />
            <br />
            <button type="submit">Submit changes</button>

          </form>


          <button onClick={handleClose}>Close</button>
        </div>
      }
    </>
  )
}

export default NewEvent;