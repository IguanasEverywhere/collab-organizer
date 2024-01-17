import React from 'react';
import Backdrop from '../../Backdrop/Backdrop';
import lightStyles from './NewStudentModal.module.css';
import * as yup from 'yup';
import { useFormik } from 'formik';

function NewStudentModal() {

  const newStudentSchema = yup.object().shape({
    name: yup.string().required(),
    instrument: yup.string().required(),
    teacher: yup.string().required(),
    email: yup.string().email().required(),
  })

  const studentFormik = useFormik({
    initialValues: {
      name: "",
      instrument: "",
      teacher: "",
      email: ""
    },
    validationSchema: newStudentSchema,
    onSubmit: (values) => {
      fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }).then(r => r.json()).then(newStudent => console.log(newStudent))
    }
  })

  return (
    <div className={lightStyles.modalContainer}>
      <Backdrop />
      <div className={lightStyles.modalBody}>
        <form onSubmit={studentFormik.handleSubmit}>
          <label htmlFor="name">Student Name</label>
          <input
          name="name"
          id="name"
          onChange={studentFormik.handleChange}
          value={studentFormik.values.name}></input>

          <label htmlFor="email">Student Email</label>
          <input
          name="email"
          id="email"
          onChange={studentFormik.handleChange}
          value={studentFormik.values.email}></input>

          <label htmlFor="instrument">Instrument</label>
          <input
          name="instrument"
          id="instrument"
          onChange={studentFormik.handleChange}
          value={studentFormik.values.instrument}></input>

          <label htmlFor="teacher">Teacher Name</label>
          <input
          name="teacher"
          id-="teacher"
          onChange={studentFormik.handleChange}
          value={studentFormik.values.teacher}></input>

          <button type="submit">Submit</button>

        </form>
      </div>
    </div>
  )
}

export default NewStudentModal;