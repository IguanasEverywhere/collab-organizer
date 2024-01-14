import React, { useState, useEffect } from 'react';
import lightStyles from './EventModalLight.module.css';
import Backdrop from '../Backdrop/Backdrop';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useParams, useHistory } from 'react-router-dom';

function EventModal({ setModalVisible, eventInfo }) {

  const params = useParams();
  const history = useHistory();

  const [availablePianists, setAvailablePianists] = useState([]);

  useEffect(() => {
    fetch('/api/pianists')
      .then(r => r.json())
      .then(pianists => setAvailablePianists(pianists))
  }, [])


  console.log(availablePianists)

  function handleClose() {
    setModalVisible((modalVisible) => !modalVisible)
  }

  const schema = yup.object().shape({
    eventType: yup.string(),
    eventLength: yup.number(),
    eventLocation: yup.string().required(),
    pianistId: yup.number(),
  })

  const formik = useFormik({
    initialValues: {
      eventType: eventInfo.event_type,
      eventLength: eventInfo.event_length,
      eventLocation: eventInfo.location,
      pianistId: eventInfo.pianist.id,
      eventTime: eventInfo.event_time,
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
        //this causes refresh
        history.go(0);
      })
    }
  })

  console.log(formik.values)


  // add errors to form
  return (
    <>
      <Backdrop />
      <div className={lightStyles.modalBody}>
        <form onSubmit={formik.handleSubmit}>
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
    </>
  )
}

export default EventModal;