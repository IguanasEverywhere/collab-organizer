import React from 'react';
import lightStyles from './EventModalLight.module.css';
import Backdrop from '../Backdrop/Backdrop';
import { useFormik } from 'formik';
import * as yup from "yup";

function EventModal({ setModalVisible }) {

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
    
  })

  return (
    <>
      <Backdrop />
      <div className={lightStyles.modalBody}>
        <form>
          <input></input>
        </form>
        <button onClick={handleClose}>Close</button>
      </div>
    </>
  )
}

export default EventModal;