import React from 'react';
import lightStyles from './EventModalLight.module.css';
import Backdrop from '../Backdrop/Backdrop';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useParams, useHistory } from 'react-router-dom';

function EventModal({ setModalVisible }) {

  const params = useParams();
  const history = useHistory();

  console.log(params)

  function handleClose() {
    setModalVisible((modalVisible) => !modalVisible)
  }

  const schema = yup.object().shape({
    eventType: yup.string(),
    eventLength: yup.number(),
    eventLocation: yup.string(),
    studentId: yup.number(),
    pianistId: yup.number(),
  })

  const formik = useFormik({
    initialValues: {
      eventType: "",
      eventLength: "",
      eventLocation: "",
      studentId: "",
      pianistId: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      fetch(`/api/events/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      }).then(r => r.json()).then(confirmation => {
        history.go(0);
      })
    }

  })


  // add errors to form
  return (
    <>
      <Backdrop />
      <div className={lightStyles.modalBody}>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="eventType">Event Type</label>
          <br />
          <input
            id="eventType"
            name="eventType"
            onChange={formik.handleChange}
            value={formik.values.eventType}></input>
          <br />

          <label htmlFor="eventLength">Event Length</label>
          <br />
          <input
            id="eventLength"
            name="eventLength"
            onChange={formik.handleChange}
            value={formik.values.eventLength}></input>
          <br />

          <label htmlFor="eventLocation">Event Location</label>
          <br />
          <input
            id="eventLocation"
            name="eventLocation"
            onChange={formik.handleChange}
            value={formik.values.eventLocation}></input>
          <br />

          <label htmlFor="studentId">Student ID</label>
          <br />
          <input
            id="studentId"
            name="studentId"
            onChange={formik.handleChange}
            value={formik.values.studentId}></input>
          <br />

          <label htmlFor="pianistId">Pianist ID</label>
          <br />
          <input
            id="pianistId"
            name="pianistId"
            onChange={formik.handleChange}
            value={formik.values.pianistId}></input>
          <br />
          <button type="submit">Submit changes</button>

        </form>

        <button onClick={handleClose}>Close</button>
      </div>
    </>
  )
}

export default EventModal;