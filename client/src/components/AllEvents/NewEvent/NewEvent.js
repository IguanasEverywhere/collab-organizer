import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import lightStyles from './NewEventLight.module.css';
import darkStyles from './NewEventDark.module.css';
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NewEvent() {

  const history = useHistory();
  const viewMode = useSelector(state => state.viewMode.value)
  const currentStyle = viewMode === "light" ? lightStyles : darkStyles

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
      pianistId: "",
      eventTime: `${defaultYear}-${defaultMonth}-${defaultDay}T12:00`,
      studentId: availableStudents.length > 0 ? availableStudents[0].id : 1,
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      }).then(r => r.json()).then(confirmation => {
        history.push('/events');
      })
    }
  })


  // add errors to form
  return (
    <div className={currentStyle.newEventBg}>
      {availableStudents.length === 0 ? <p>You need at least one student to create an event! Go to your students listing <Link to='/students'>here.</Link> </p> :
        <div className={currentStyle.newEventArea}>
          <div className={currentStyle.modalBody}>
            <form onSubmit={formik.handleSubmit}>
              <h3>Event Information:</h3>

              <label htmlFor="student">Student</label>
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

              <label htmlFor="eventType">Event Type</label>
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

              <label htmlFor="eventLength">Event Length</label>
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

              <label htmlFor="eventLocation">Event Location</label>
              <input
                id="eventLocation"
                name="eventLocation"
                onChange={formik.handleChange}
                value={formik.values.eventLocation}></input>
              <br />
              <small>{formik.errors.eventLocation}</small>

              <label htmlFor="eventTime">Event Time</label>
              <input
                id="eventTime"
                name="eventTime"
                type="datetime-local"
                onChange={formik.handleChange}
                value={formik.values.eventTime}
              >
              </input>
              <br />

              <label htmlFor="pianist">Pianist</label>
              <select
                id="pianistId"
                name="pianistId"
                onChange={formik.handleChange}
                value={formik.values.pianistId}>
                <option value={""}>UNASSIGNED PIANIST</option>
                {availablePianists.map((pianist) =>
                  <option
                    value={pianist.id}
                    key={pianist.id}>
                    {`${pianist.name} | ${pianist.role}`}
                  </option>)}
              </select>
              <br />

              <button type="submit">Add New Event</button>

            </form>
          </div>
        </div>
      }
    </div>
  )
}

export default NewEvent;